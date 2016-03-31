/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Post from "../domains/Post"
import Setting from "../domains/Setting"
import * as PostAction from "../actions/PostAction"
import GlobalRepository from "../domains/GlobalRepository"
import {
  AUTO_RELOAD_MSEC,
  AUTO_RELOAD_RECHECK_MSEC
} from "../app.const"

interface Props {
  post?: Post
  setting?: Setting
  postAction?: {
    connectSlack: (token: string) => void,
  }
  route?: {
    path: string,
  }
  children?: Array<Component<any, any>>
}

class MainContainer extends Component<Props, any> {

  public render() {
    return (
      <div className="MainContainer">
        {this.props.children}
      </div>
    )
  }

  public componentDidMount() {
    const {route, setting} = this.props
    if (route.path === "/") {
      // redirect @todo use react-router?
      location.hash = `/${setting.notifyType}`
    }
    const {connectSlack} = this.props.postAction
    if (setting.slackToken) {
      connectSlack(setting.slackToken)
    }
    if (setting.slackTokenAlt) {
      connectSlack(setting.slackTokenAlt)
    }
    this.setTimeoutAutoReload()
  }

  private setTimeoutAutoReload() {
    new Promise((resolve, reject) => setTimeout(resolve, AUTO_RELOAD_MSEC)).
    then(() => {
      const check = () => {
        const {post} = this.props
        if (post.letters.length === 0) {
          GlobalRepository.mainWindow.reload()
        } else {
          setTimeout(check, AUTO_RELOAD_RECHECK_MSEC)
        }
      }
      check()
    })
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
)(MainContainer)
