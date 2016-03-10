import * as uuid from 'node-uuid'

export default class UID {
  private uid: string

  constructor(uid: string = null) {
    this.uid = uid || uuid.v1()
    Object.freeze(this)
  }

  valueOf(): string {
    return this.uid
  }

  toString(): string {
    return this.valueOf()
  }
}
