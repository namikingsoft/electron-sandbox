import {Seq} from 'immutable'
import Letter from './Letter'
import freeze from '../decorators/freeze'

@freeze
export default class Post {
  constructor(private param: {
    letters: Seq.Indexed<Letter>
  }) {}

  get letters(): Seq.Indexed<Letter> {
    return this.param.letters
  }
}
