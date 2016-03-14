import {Seq} from 'immutable'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import {
  PostAction,
  ADD_LETTER,
  REMOVE_LETTER,
} from '../actions/PostAction'

const initialState: Post = new Post({
  letters: Seq.of<Letter>(),
})

export default function post(
  state: Post = initialState,
  action: PostAction
): Post {
  switch (action.type) {
  case ADD_LETTER:
    return new Post({
      letters: state.letters.concat(action.letter).toIndexedSeq(),
    })
  case REMOVE_LETTER:
    return new Post({
      letters:
        state.letters.filter(x => x !== action.letter).toIndexedSeq(),
    })
  }
  return state
}
