import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'immutable'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import Setting from '../domains/Setting'
import TypingNotification from '../components/TypingNotification'
import * as PostAction from '../actions/PostAction'
import {STREAM_TRANS_MSEC} from '../app.const'

interface Props {
  post?: Post
  setting?: Setting
  postAction?: {
    connectSlack: (token: string)=>void,
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
        {letters.map(x => <TypingNotification key={x.id} letter={x}
          onMount={() => setTimeout(() => removeLetter(x), 5000)} />)}
      </div>
    )
  }

  componentDidMount() {
    const {setting} = this.props
    const {connectSlack} = this.props.postAction
    if (connectSlack) {
      connectSlack(setting.slackToken)
    }
  }
}

export default connect(
  state => new Object({
    post: state.post,
    setting: state.setting,
  }),
  dispatch => new Object({
    postAction: bindActionCreators(PostAction, dispatch),
  })
)(TypingContainer)
