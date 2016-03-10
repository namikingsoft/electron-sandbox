import UID from './UID'

export default class Letter {
  constructor(private param: {
    text: string,
    uid?: UID,
  }) {
    if (!this.param.uid) {
      this.param.uid = new UID()
    }
    Object.freeze(this)
    Object.freeze(this.param)
  }

  get id(): string {
    return this.param.uid.toString()
  }

  get text(): string {
    return this.param.text
  }

  get textDisplay(): string {
    if (this.text) {
      return this.text
      .replace(/<[^<>]*>/g, '')
    } else  {
      return ''
    }
  }
}
