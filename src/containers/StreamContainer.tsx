import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'immutable'
import PostCanvas from '../components/PostCanvas'
import Post from '../domains/Post'
import Setting from '../domains/Setting'
import * as PostAction from '../actions/PostAction'

interface Props {
  post?: Post
  setting?: Setting
  postAction?: {
    connectSlack: (token: string)=>void,
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
        <PostCanvas post={post} />
      </div>
    )
  }

  componentDidMount() {
    const {setting} = this.props
    this.connectSlack(setting.slackToken)
  }

  componentDidUpdate(prevProps: Props) {
    const setting = this.props.setting
    const settingPrev = prevProps.setting
    if (setting.slackToken !== settingPrev.slackToken) {
      this.connectSlack(setting.slackToken)
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
