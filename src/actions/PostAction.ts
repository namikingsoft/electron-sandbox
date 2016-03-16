import Action, {Dispatcher, Dispatch} from './Action'
import {
  UserObject,
  UserListObject,
  ChannelObject,
  ChannelListObject,
  MessageObject,
} from '../domains/SlackObject'
import Letter from '../domains/Letter'
import User from '../domains/User'
import Channel from '../domains/Channel'
import Message from '../domains/Message'

const slack = require('slack')
const bot = slack.rtm.client()

export interface PostAction extends Action {
  type: string
  letter?: Letter
}

export function connectSlack(token: string): Dispatcher {
  let isConnect = false
  let userInfo: {[index:string]: string} = {}
  let channelInfo: {[index:string]: string} = {}
  return (dispatch: Dispatch) => {
    if (isConnect) {
      bot.close()
      isConnect = false
    }
    bot.hello(() => {
      isConnect = true
      slack.users.list({token}, (err: Error, data: UserListObject) => {
        if (err) {
          throw err
        }
        data.members.forEach(x => userInfo[x.id] = x.name)
      })
      slack.channels.list({token}, (err: Error, data: ChannelListObject) => {
        if (err) {
          throw err
        }
        data.channels.forEach(x => channelInfo[x.id] = x.name)
      })
    })
    bot.message((obj: MessageObject) => {
      if (!obj.text) {
        return
      }
      const user = new User({
        id: obj.user,
        name: userInfo[obj.user],
      })
      const channel = new Channel({
        id: obj.channel,
        name: channelInfo[obj.channel],
      })
      const message = new Message(obj.text)
      const letter = new Letter({user, channel, message})
      dispatch(addLetter(letter))
      // @todo magic number
      setTimeout(() => dispatch(removeLetter(letter)), 12000)
    })
    bot.listen({token})
  }
}

export function addLetter(letter: Letter): PostAction {
  return {type: ADD_LETTER, letter}
}

export function removeLetter(letter: Letter): PostAction {
  return {type: REMOVE_LETTER, letter}
}

export const ADD_LETTER = 'ADD_LETTER'
export const REMOVE_LETTER = 'REMOVE_LETTER'
