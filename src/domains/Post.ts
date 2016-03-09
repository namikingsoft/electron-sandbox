import {List} from 'immutable'
import Letter from './Letter'

export default class Post {
  constructor(private param: {
    letters: List<Letter>
  }) {}

  get letters(): List<Letter> {
    return this.param.letters
  }
}
