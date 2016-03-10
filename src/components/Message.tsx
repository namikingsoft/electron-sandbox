import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Component, PropTypes} from 'react'
import Letter from '../domains/Letter'

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
      top: Math.floor(Math.random() * (window.innerHeight-20)),
      left: window.innerWidth,
    }
  }

  render() {
    const {letter} = this.props
    return (
      <div className="Message" style={this.state}>
        <span className="Message__label" ref="label">{letter.text}</span>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      // @todo any
      const label: any = ReactDOM.findDOMNode(this.refs['label'])
      this.setState({
        top: this.state.top,
        left: -label.offsetWidth,
      })
    }, 100)
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps: Props = null) {
  }
}
