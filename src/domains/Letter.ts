export default class Letter {
  constructor(private param: {
    text: string,
  }) {}

  get text(): string {
    return this.param.text
  }
}
