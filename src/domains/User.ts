import freeze from '../decorators/freeze'
import {NO_IMAGE_URL} from '../constants/AppConst'

@freeze
export default class User {
  constructor(private param: {
    id: string
    name: string,
    image?: string,
  }) {}

  get id(): string {
    return this.param.id
  }

  get name(): string {
    return this.param.name
  }

  get image(): string {
    return this.param.image || NO_IMAGE_URL
  }
}
