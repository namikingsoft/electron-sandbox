import * as React from 'react'
import {Component, PropTypes, FormEvent} from 'react'

interface Props {
  children?: Array<Component<any,any>>
  onClick?: ()=>void
}

export default class Button extends Component<Props, any> {
  render() {
    const {children} = this.props
    return (
      <div className="Button pure-controls">
        <button
          className="pure-button pure-button-primary"
          onClick={e => this.handleClick(e)}>
          {children}
        </button>
      </div>
    )
  }

  handleClick(e: FormEvent) {
    const {onClick} = this.props
    if (onClick) {
      onClick()
    }
  }
}
