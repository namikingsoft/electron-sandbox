/// <reference path="../reference.d.ts" />
import Post from "../domains/Post"
import {
  PostAction,
  ADD_LETTER,
  REMOVE_LETTER,
} from "../actions/PostAction"

const initialState: Post = new Post({
  letters: [],
})

export default function post(
  state: Post = initialState,
  action: PostAction
): Post {

  switch (action.type) {
  case ADD_LETTER:
    return new Post({
      letters: state.letters.concat(action.letter),
    })
  case REMOVE_LETTER:
    return new Post({
      letters: state.letters.filter(x => x !== action.letter),
    })
  }
  return state
}
