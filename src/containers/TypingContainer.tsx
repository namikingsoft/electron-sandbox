/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component, PropTypes} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Post from "../domains/Post"
import Letter from "../domains/Letter"
import Setting from "../domains/Setting"
import TypingNotify from "../components/TypingNotify"
import * as PostAction from "../actions/PostAction"

interface Props {
  post?: Post
  setting?: Setting
  postAction?: {
    removeLetter: (letter: Letter)=>void,
  }
}

class TypingContainer extends Component<Props, any> {
  render() {
    const {letters} = this.props.post
    const {removeMsec} = this.props.setting
    const {removeLetter} = this.props.postAction
    return (
      <div className="TypingContainer">
        {letters.map(x =>
          <TypingNotify
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
)(TypingContainer)
