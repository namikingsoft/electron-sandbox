export default class Letter {
  constructor(private param: {
    text: string,
  }) {
    Object.freeze(this)
    Object.freeze(this.param)
  }

  get text(): string {
    return this.param.text
  }
}
