import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'immutable'
import Post from '../domains/Post'
import Letter from '../domains/Letter'
import Setting from '../domains/Setting'
import StreamNotification from '../components/StreamNotification'
import * as PostAction from '../actions/PostAction'
import {STREAM_TRANS_MSEC} from '../constants/AppConst'

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
    return (
      <div className="layout-app">
        {post.letters.map(x => <StreamNotification key={x.id} letter={x} />)}
      </div>
    )
  }

  componentDidMount() {
    const {setting} = this.props
    this.connectSlack(setting.slackToken)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.post !== prevProps.post) {
      // set remove timer at added letters
      const {removeLetter} = this.props.postAction
      this.props.post.letters
      .filterNot(x => prevProps.post.letters.includes(x))
      .forEach(x => setTimeout(() => removeLetter(x), STREAM_TRANS_MSEC))
    }
    if (this.props.setting !== prevProps.setting) {
      this.connectSlack(this.props.setting.slackToken)
    }
  }

  private connectSlack(slackToken: string) {
    if (slackToken) {
      this.props.postAction.connectSlack(slackToken)
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
