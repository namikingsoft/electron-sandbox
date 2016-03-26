import freeze from "../decorators/freeze"

@freeze
export default class Channel {
  constructor(private param: {
    id: string
    name: string,
  }) {}

  get id(): string {
    return this.param.id
  }

  get name(): string {
    return this.param.name
  }
}
