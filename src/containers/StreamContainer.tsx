import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import Setting from '../domains/Setting'
import StreamNotify from '../components/StreamNotify'
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

class StreamContainer extends Component<Props, any> {
  constructor() {
    super()
  }

  render() {
    const {post} = this.props
    const {removeLetter} = this.props.postAction
    return (
      <div className="StreamContainer">
        {post.letters.map(x =>
          <StreamNotify
            key={x.id} letter={x}
            onMount={() => setTimeout(() => removeLetter(x), STREAM_TRANS_MSEC)}
          />
        )}
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
)(StreamContainer)
