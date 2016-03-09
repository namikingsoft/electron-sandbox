import * as React from 'react'
import {Component, PropTypes} from 'react'
import Letter from '../domains/Letter'

interface Props {
  letter: Letter
}

export default class Message extends Component<Props, any> {
  render() {
    const {letter} = this.props
    return (
      <div>{letter.text}</div>
    )
  }
}
