import {List} from 'immutable'
import Letter from './Letter'

export default class Post {
  constructor(private param: {
    letters: List<Letter>
  }) {
    Object.freeze(this)
    Object.freeze(this.param)
  }

  get letters(): List<Letter> {
    return this.param.letters
  }
}
