import * as React from "react"
import * as ReactDOM from "react-dom"
import {Component, PropTypes} from "react"
import Letter from "../domains/Letter"

interface Props {
  letter: Letter
  removeMsec: number
  onMount?: ()=>void
}

interface State {
  top: number
  left: number
}

export default class StreamNotify extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      top: Math.floor(Math.random() * (window.innerHeight-100)), // @todo asobi
      left: window.innerWidth,
    }
  }

  render() {
    const {letter, removeMsec} = this.props
    const style: any = this.state
    style["transition"] = `left ${removeMsec}ms linear`
    return (
      <div className="StreamNotify" style={style}>
        <div className="StreamNotify__image">
          <img src={letter.user.image} />
        </div>
        <div className="StreamNotify__main">
          <div className="StreamNotify__main__meta">
            <span className="StreamNotify__main__meta__user">
              {letter.user.name}
            </span>
            <span className="StreamNotify__main__meta__channel">
              {letter.channel.name}
            </span>
          </div>
          <div className="StreamNotify__main__label" ref="label">
            {letter.message.toDisplay()}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      // @todo any
      const label: any = ReactDOM.findDOMNode(this.refs["label"])
      this.setState({
        top: this.state.top,
        left: -label.offsetWidth - 300, // @todo asobi
      })
    }, 0)
    this.props.onMount()
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps: Props = null) {
  }
}
