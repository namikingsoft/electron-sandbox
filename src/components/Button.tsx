import * as React from 'react'
import {Component, PropTypes, FormEvent} from 'react'

interface Props {
  children?: Array<Component<any,any>>
  mode?: string
  onClick?: ()=>void
}

export default class Button extends Component<Props, any> {
  render() {
    const mode = this.props.mode || 'default'
    return (
      <span className="Button">
        <button
          className={`pure-button pure-button-${mode}`}
          onClick={e => this.handleClick(e)}>
          {this.props.children}
        </button>
      </span>
    )
  }

  handleClick(e: FormEvent) {
    const {onClick} = this.props
    if (onClick) {
      onClick()
    }
  }
}
