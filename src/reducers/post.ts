import {List} from 'immutable'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import {
  PostAction,
  ADD_MESSAGE
} from '../actions/PostAction'

const initialState: Post = new Post({
  letters: List.of<Letter>(),
})

export default function messages(state: Post = initialState, action: PostAction) {
  switch (action.type) {
  case ADD_MESSAGE:
    return new Post({
      letters: state.letters.push(
        new Letter({
          text: action.text,
        })
      ),
    })
  }
  return state
}
