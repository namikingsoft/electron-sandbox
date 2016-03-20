import freeze from '../decorators/freeze'

@freeze
export default class Setting {
  constructor(private param: {
    slackToken: string,
    notifyType: string,
  }) {}

  get slackToken(): string {
    return this.param.slackToken
  }

  get notifyType(): string {
    return this.param.notifyType
  }
}
