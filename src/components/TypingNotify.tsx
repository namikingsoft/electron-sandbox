/// <reference path="../reference.d.ts" />
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Component, PropTypes} from "react"
import Letter from "../domains/Letter"
import {TYPING_DELTA_MSEC} from "../app.const"

interface Props {
  letter: Letter
  removeMsec: number
  onMount?: ()=>void
}

interface State {
  source?: string,
  count?: number,
  style?: {
    transition?: string,
    transform?: string,
    maxHeight?: number,
  }
}

export default class TypingNotify extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      source: props.letter.message.toDisplay(),
      count: 0,
      style: {
        transition: "all 500ms ease-out",
        transform: "translateX(110%)",
        maxHeight: 500,
      },
    }
  }

  render() {
    const {letter} = this.props
    const {source, count, style} = this.state
    // @todo 5 is magic number of anti-afterimage
    const typingClass = count < source.length-5 ? "typing" : ""
    return (
      <div className="TypingNotify" style={style}>
        <div className="TypingNotify__meta">
          <div className="TypingNotify__meta__image">
            <img src={letter.user.image} />
          </div>
          <div className="TypingNotify__meta__user">
            {letter.user.name}
          </div>
          <div className="TypingNotify__meta__channel">
            {letter.channel.name}
          </div>
        </div>
        <div className={`TypingNotify__message ${typingClass}`}>
          {source.slice(0, count)}
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount()
    }
    this.typing()
    this.animate()
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps: Props = null) {
  }

  private typing() {
    const {source, count} = this.state
    this.setState({
      count: count + 1,
    })
    if (count + 1 < source.length) {
      setTimeout(() => this.typing(), TYPING_DELTA_MSEC)
    }
  }

  private animate() {
    const {removeMsec} = this.props
    new Promise((resolve, reject) => setTimeout(resolve, 0))
    .then(() => new Promise((resolve, reject) => {
      this.setState({
        style: {
          transition: "all 500ms ease-out",
          transform: "translateX(0)",
          maxHeight: 500,
        },
      })
      setTimeout(resolve, removeMsec-1500)
    }))
    .then(() => new Promise((resolve, reject) => {
      this.setState({
        style: {
          transition: "all 500ms ease-out",
          transform: "translateX(110%)",
          maxHeight: 500,
        },
      })
      setTimeout(resolve, 500)
    }))
    .then(() => new Promise((resolve, reject) => {
      this.setState({
        style: {
          transition: "all 500ms ease-out",
          transform: "translateX(110%)",
          maxHeight: 0,
        },
      })
      resolve()
    }))
  }
}
