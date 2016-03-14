import * as React from 'react'
import {Component, PropTypes} from 'react'

interface Props {
  label: string
  value: string
  onChange?: (text: string)=>void
}

interface State {
  text: string
}

export default class TextField extends Component<Props, State> {
  constructor(props: Props) {
    super()
    this.state = {
      text: props.value || '',
    }
  }

  render() {
    const {label} = this.props
    const {text} = this.state
    return (
      <div className="TextField pure-control-group">
        <label>{label}</label>
        <input type="text"
          placeholder={label}
          value={text}
          onChange={e => this.handleChange(e)} />
      </div>
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
