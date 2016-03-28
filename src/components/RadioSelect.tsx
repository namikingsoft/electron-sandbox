/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component} from "react"

interface Radio {
  label: string
  value: string
}

interface Props {
  name: string
  value: string
  data: Array<Radio>
  onChange?: (value: string) => void
}

interface State {
  value: string
}

export default class RadioSelect extends Component<Props, State> {
  constructor(props: Props) {
    super()
    this.state = {
      value: props.value || "",
    }
  }

  public render() {
    const {name, data} = this.props
    const {value} = this.state
    return (
      <span className="RadioSelect">
        {data.map(row =>
          <label key={row.value}>
            <input
              type="radio"
              name={name}
              value={row.value}
              checked={row.value === value}
              onChange={e => this.handleChange(row.value)} />
            {row.label}
          </label>
        )}
      </span>
    )
  }

  public handleChange(value: string) {
    this.setState({value})
    const {onChange} = this.props
    if (onChange) {
      onChange(value)
    }
  }
}
