import UniqueID from './UniqueID'
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
    uid?: UniqueID,
  }) {
    if (!this.param.uid) {
      this.param.uid = new UniqueID()
    }
  }

  get id(): string {
    return this.param.uid.toString()
  }

  get user(): User {
    return this.param.user
  }

  get channel(): Channel {
    return this.param.channel
  }

  get message(): Message {
    return this.param.message
  }
}
