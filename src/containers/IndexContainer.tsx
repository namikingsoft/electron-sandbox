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
}

class IndexContainer extends Component<Props, any> {
  render() {
    return <div />
  }

  componentDidMount() {
    const {setting} = this.props
    location.hash = `/${setting.notifyType}`
  }
}

export default connect(
  state => new Object({
    setting: state.setting,
  }),
  dispatch => new Object({
    postAction: bindActionCreators(PostAction, dispatch),
  })
)(IndexContainer)
