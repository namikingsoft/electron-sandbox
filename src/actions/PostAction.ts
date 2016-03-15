import Action, {Dispatcher, Dispatch} from './Action'
import Letter from '../domains/Letter'

const slack = require('slack')
const bot = slack.rtm.client()

interface MessageRow {
  text: string
  user: string
  channel: string
}

interface UsersRow {
  members: Array<{id: string, name: string}>
}

interface ChannelsRow {
  channels: Array<{id: string, name: string}>
}

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
      slack.users.list({token}, (err: Error, data: UsersRow) => {
        if (err) {
          throw err
        }
        data.members.forEach(x => userInfo[x.id] = x.name)
      })
      slack.channels.list({token}, (err: Error, data: ChannelsRow) => {
        if (err) {
          throw err
        }
        data.channels.forEach(x => channelInfo[x.id] = x.name)
      })
    })
    bot.message((message: MessageRow) => {
      console.log(message)
      const text = message.text
      const user = userInfo[message.user]
      const channel = channelInfo[message.channel]
      const letter = new Letter({text, user, channel})
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
