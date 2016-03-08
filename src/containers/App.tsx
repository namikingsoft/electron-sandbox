import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Main from '../components/Main'

export default class App extends Component<any, any> {

  render() {
    return (
      <div className="layout-app">
        <Main />
      </div>
    )
  }
}
