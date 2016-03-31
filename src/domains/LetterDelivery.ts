/// <reference path="../reference.d.ts" />
import * as Promise from "bluebird"
import {
  UserObject,
  UserListObject,
  ChannelObject,
  ChannelListObject,
  MessageObject,
} from "../domains/SlackObject"
import Letter from "../domains/Letter"
import User from "../domains/User"
import Channel from "../domains/Channel"
import Message from "../domains/Message"
import freeze from "../decorators/freeze"

const slack = require("slack")
Promise.promisifyAll(slack.auth)
Promise.promisifyAll(slack.users)
Promise.promisifyAll(slack.channels)

interface MetaInfo {
  user: {[index: string]: UserObject}
  channel: {[index: string]: ChannelObject}
}

@freeze
export default class LetterDelivery {

  constructor(
    private slackToken: string
  ) {}

  public onPost(callback: (letter: Letter) => void): Promise<boolean> {
    return this.getMetaInfo()
    .then(meta => {
      const token = this.slackToken
      const bot = slack.rtm.client()
      bot.message((obj: MessageObject) => {
        if (!(obj.text && obj.team)) {
          return
        }
        const userObj = meta.user[obj.user]
        const user = new User({
          id: obj.user,
          name: userObj ? userObj.name : obj.user,
          image: userObj ? userObj.profile.image_72 : undefined,
        })
        const channelObj = meta.channel[obj.channel]
        const channel = new Channel({
          id: obj.channel,
          name: channelObj ? channelObj.name : obj.channel,
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
    const meta: MetaInfo = {
      user: {},
      channel: {},
    }
    return slack.auth.testAsync({token})
    .then(() => {
      return slack.users.listAsync({token})
    })
    .then((data: UserListObject) => {
      data.members.forEach(x => meta.user[x.id] = x)
      return slack.channels.listAsync({token})
    })
    .then((data: ChannelListObject) => {
      data.channels.forEach(x => meta.channel[x.id] = x)
      return meta
    })
  }
}
