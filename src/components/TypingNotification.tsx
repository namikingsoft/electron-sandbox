import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Component, PropTypes} from 'react'
import Letter from '../domains/Letter'

interface Props {
  letter: Letter
  onMount?: ()=>void
}

interface State {
}

export default class TypingNotification extends Component<Props, State> {
  constructor() {
    super()
  }

  render() {
    const {letter} = this.props
    return (
      <div className="TypingNotification">
        <div className="TypingNotification__meta">
          <div className="TypingNotification__meta__image">
            <img src={letter.user.image} />
          </div>
          <div className="TypingNotification__meta__user">
            {letter.user.name}
          </div>
          <div className="TypingNotification__meta__channel">
            {letter.channel.name}
          </div>
        </div>
        <div className="TypingNotification__message">
          {letter.message.toDisplay()}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {onMount} = this.props
    if (onMount) {
      this.props.onMount()
    }
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps: Props = null) {
  }
}
