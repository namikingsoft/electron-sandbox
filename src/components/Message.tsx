import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Component, PropTypes} from 'react'
import Letter from '../domains/Letter'
import {STREAM_TRANS_MSEC} from '../constants/AppConst'

interface Props {
  letter: Letter
}

interface State {
  top: number
  left: number
}

export default class Message extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      top: Math.floor(Math.random() * (window.innerHeight-100)), // @todo asobi
      left: window.innerWidth,
    }
  }

  render() {
    const {letter} = this.props
    const style: any = this.state
    style['transition'] = `left ${STREAM_TRANS_MSEC}ms linear`
    return (
      <div className="Message" style={style}>
        <div className="Message__meta">
          <span className="Message__meta__user">{letter.user}</span>
          <span className="Message__meta__channel">{letter.channel}</span>
        </div>
        <span className="Message__label" ref="label">{letter.message}</span>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      // @todo any
      const label: any = ReactDOM.findDOMNode(this.refs['label'])
      this.setState({
        top: this.state.top,
        left: -label.offsetWidth - 300, // @todo asobi
      })
    }, 0)
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps: Props = null) {
  }
}
