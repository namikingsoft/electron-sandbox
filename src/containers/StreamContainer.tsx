/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Post from "../domains/Post"
import Letter from "../domains/Letter"
import Setting from "../domains/Setting"
import * as PostAction from "../actions/PostAction"
import StreamNotify from "../components/StreamNotify"

interface Props {
  post?: Post
  setting?: Setting
  postAction?: {
    removeLetter: (letter: Letter) => void,
  }
}

class StreamContainer extends Component<Props, any> {
  public render() {
    const {letters} = this.props.post
    const {removeMsec} = this.props.setting
    const {removeLetter} = this.props.postAction
    return (
      <div className="StreamContainer">
        {letters.map(x =>
          <StreamNotify
            key={x.id} letter={x}
            removeMsec={removeMsec}
            onMount={() => setTimeout(() => removeLetter(x), removeMsec)}
          />
        )}
      </div>
    )
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
