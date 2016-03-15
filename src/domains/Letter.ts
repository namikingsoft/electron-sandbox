import UID from './UID'
import freeze from '../decorators/freeze'

@freeze
export default class Letter {
  constructor(private param: {
    text: string,
    user: string,
    channel: string,
    uid?: UID,
  }) {
    if (!this.param.uid) {
      this.param.uid = new UID()
    }
  }

  get id(): string {
    return this.param.uid.toString()
  }

  get text(): string {
    return this.param.text
  }

  get user(): string {
    return this.param.user
  }

  get channel(): string {
    return this.param.channel
  }

  get textDisplay(): string {
    if (this.text) {
      return this.text.replace(/<[^<>]*>/g, '')
    } else  {
      return ''
    }
  }
}
