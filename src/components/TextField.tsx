/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component} from "react"

interface Props {
  value: string
  placeholder: string
  hideFirst?: boolean
  onChange?: (text: string) => void
}

interface State {
  text?: string
  hide?: boolean
}

export default class TextField extends Component<Props, State> {
  constructor(props: Props) {
    super()
    this.state = {
      text: props.value || "",
      hide: props.hideFirst || false,
    }
  }

  public render() {
    const {placeholder} = this.props
    const {text, hide} = this.state
    const component = (() => {
      if (text && hide) {
        return (
          <input type="text"
            placeholder={`${placeholder} (display value on focus)`}
            onFocus={e => this.showValue()} />
        )
      } else {
        return (
          <input type="text"
            value={text}
            placeholder={placeholder}
            onChange={e => this.handleChange(e)}
            onBlur={e => this.hideValue()} />
        )
      }
    })()
    return (
      <span className="TextField">
        {component}
      </span>
    )
  }

  public handleChange(e: any) {
    const text = e.target.value
    this.setState({text})
    const {onChange} = this.props
    if (onChange) {
      onChange(text)
    }
  }

  public showValue() {
    if (this.props.hideFirst) {
      this.setState({hide: false})
    }
  }

  public hideValue() {
    if (this.props.hideFirst) {
      this.setState({hide: true})
    }
  }
}
