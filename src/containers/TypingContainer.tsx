import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import TypingNotify from '../components/TypingNotify'
import * as PostAction from '../actions/PostAction'
import {TYPING_TRANS_MSEC} from '../app.const'

interface Props {
  post?: Post
  postAction?: {
    removeLetter: (letter: Letter)=>void,
  }
}

class TypingContainer extends Component<Props, any> {
  constructor() {
    super()
  }

  render() {
    const {letters} = this.props.post
    const {removeLetter} = this.props.postAction
    return (
      <div className="TypingContainer">
        {letters.map(x => <TypingNotify key={x.id} letter={x}
          onMount={() => setTimeout(() => removeLetter(x), TYPING_TRANS_MSEC)} />)}
      </div>
    )
  }
}

export default connect(
  state => new Object({
    post: state.post,
  }),
  dispatch => new Object({
    postAction: bindActionCreators(PostAction, dispatch),
  })
)(TypingContainer)
