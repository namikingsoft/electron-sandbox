import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Setting from '../domains/Setting'

interface Props {
  setting?: Setting
}

class IndexContainer extends Component<Props, any> {
  render() {
    return <div />
  }

  componentDidMount() {
    location.hash = 'stream'
  }
}

export default connect(
  state => new Object({
    setting: state.setting,
  })
)(IndexContainer)
