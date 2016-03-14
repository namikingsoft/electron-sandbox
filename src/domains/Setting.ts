import freeze from '../decorators/freeze'

@freeze
export default class Setting {
  constructor(private param: {
    slackToken: string,
  }) {}

  get slackToken(): string {
    return this.param.slackToken
  }
}
