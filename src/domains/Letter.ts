import UID from './UID'
import User from './User'
import Channel from './Channel'
import Message from './Message'
import freeze from '../decorators/freeze'

@freeze
export default class Letter {
  constructor(private param: {
    user: User,
    channel: Channel,
    message: Message,
    uid?: UID,
  }) {
    if (!this.param.uid) {
      this.param.uid = new UID()
    }
  }

  get id(): string {
    return this.param.uid.toString()
  }

  get user(): string {
    return this.param.user.name
  }

  get channel(): string {
    return this.param.channel.name
  }

  get message(): string {
    return this.param.message.toDisplay()
  }
}
