/// <reference path="../reference.d.ts" />
import Letter from "./Letter"
import freeze from "../decorators/freeze"

@freeze
export default class Post {
  constructor(private param: {
    letters: Array<Letter>
  }) {}

  get letters(): Array<Letter> {
    return this.param.letters
  }
}
