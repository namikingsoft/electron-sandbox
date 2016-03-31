/// <reference path="../reference.d.ts" />
import freeze from "../decorators/freeze"

@freeze
export default class Team {

  constructor(private param: {
    id: string
    name: string,
    domain: string,
  }) {}

  get id(): string {
    return this.param.id
  }

  get name(): string {
    return this.param.name
  }

  get domain(): string {
    return this.param.domain
  }
}
