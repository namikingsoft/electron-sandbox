import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Setting from '../domains/Setting'
import * as PostAction from '../actions/PostAction'

interface Props {
  setting?: Setting
  postAction?: {
    connectSlack: (token: string)=>void,
  }
  route?: {
    path: string,
  }
  children?: Array<Component<any,any>>
}

class MainContainer extends Component<Props, any> {
  render() {
    return (
      <div className="MainContainer">
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    const {route, setting} = this.props
    if (route.path === '/') {
      // redirect @todo use react-router?
      location.hash = `/${setting.notifyType}`
    }
    const {connectSlack} = this.props.postAction
    if (connectSlack) {
      connectSlack(setting.slackToken)
    }
  }
}

export default connect(
  state => new Object({
    setting: state.setting,
  }),
  dispatch => new Object({
    postAction: bindActionCreators(PostAction, dispatch),
  })
)(MainContainer)
