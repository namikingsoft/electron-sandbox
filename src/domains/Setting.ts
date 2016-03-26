import freeze from "../decorators/freeze"

@freeze
export default class Setting {
  constructor(private param: {
    slackToken: string,
    notifyType: string,
    removeMsec: number,
  }) {}

  get slackToken(): string {
    return this.param.slackToken
  }

  get notifyType(): string {
    return this.param.notifyType
  }

  get removeMsec(): number {
    return this.param.removeMsec
  }
}
