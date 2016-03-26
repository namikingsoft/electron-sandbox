import * as React from "react"
import {Component, PropTypes} from "react"

interface Props {
  value: string
  placeholder: string
  onChange?: (text: string)=>void
}

interface State {
  text: string
}

export default class TextField extends Component<Props, State> {
  constructor(props: Props) {
    super()
    this.state = {
      text: props.value || "",
    }
  }

  render() {
    const {placeholder} = this.props
    const {text} = this.state
    return (
      <span className="TextField">
        <input type="text"
          value={text}
          placeholder={placeholder}
          onChange={e => this.handleChange(e)} />
      </span>
    )
  }

  handleChange(e: any) {
    const text = e.target.value
    this.setState({text})
    const {onChange} = this.props
    if (onChange) {
      onChange(text)
    }
  }
}
