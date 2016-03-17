import * as Promise from 'bluebird'
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
import freeze from '../decorators/freeze'

const slack = require('slack')
Promise.promisifyAll(slack.auth)
Promise.promisifyAll(slack.users)
Promise.promisifyAll(slack.channels)

type StringHash = {[index:string]: string}
interface MetaInfo {
  user: StringHash
  channel: StringHash
}

@freeze
export default class LetterDelivery {
  constructor(
    private slackToken: string
  ) {}

  onPost(callback: (letter:Letter)=>void): Promise<boolean> {
    return this.getMetaInfo()
    .then(meta => {
      const token = this.slackToken
      const bot = slack.rtm.client()
      bot.message((obj: MessageObject) => {
        if (!obj.text) {
          return
        }
        const user = new User({
          id: obj.user,
          name: meta.user[obj.user],
        })
        const channel = new Channel({
          id: obj.channel,
          name: meta.channel[obj.channel],
        })
        const message = new Message(obj.text)
        const letter = new Letter({user, channel, message})
        callback(letter)
      })
      bot.listen({token})
      return true
    })
  }

  private getMetaInfo(): Promise<MetaInfo> {
    const token = this.slackToken
    let user: StringHash = {}
    let channel: StringHash = {}
    return slack.auth.testAsync({token})
    .then(() => {
      return slack.users.listAsync({token})
    })
    .then((data: UserListObject) => {
      data.members.forEach(x => user[x.id] = x.name)
      return slack.channels.listAsync({token})
    })
    .then((data: ChannelListObject) => {
      data.channels.forEach(x => channel[x.id] = x.name)
      return {user, channel}
    })
  }
}
