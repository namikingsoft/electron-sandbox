import * as React from 'react'
import {Component, PropTypes} from 'react'
import Sub from './sub'

export default class Main extends Component<any, any> {

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Sub />
      </div>
    )
  }
}
