import {Seq} from 'immutable'
import Letter from './Letter'

export default class Post {
  constructor(private param: {
    letters: Seq.Indexed<Letter>
  }) {
    Object.freeze(this)
    Object.freeze(this.param)
  }

  get letters(): Seq.Indexed<Letter> {
    return this.param.letters
  }
}
