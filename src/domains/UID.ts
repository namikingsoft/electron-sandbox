import * as uuid from 'node-uuid'
import freeze from '../decorators/freeze'

@freeze
export default class UID {
  private uid: string

  constructor(uid: string = null) {
    this.uid = uid || uuid.v1()
  }

  valueOf(): string {
    return this.uid
  }

  toString(): string {
    return this.valueOf()
  }
}
