import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List} from 'immutable'
import PostCanvas from '../components/PostCanvas'
import Post from '../domains/Post'
import * as PostAction from '../actions/PostAction'

interface Props {
  post?: Post
  postAction?: {
    startListen: ()=>void,
    addMessage: (text:string)=>void,
  }
}

class App extends Component<Props, any> {
  constructor() {
    super()
  }

  render() {
    const {post} = this.props
    return (
      <div className="layout-app">
        <PostCanvas post={post} />
      </div>
    )
  }

  componentDidMount() {
    const {startListen, addMessage} = this.props.postAction
    startListen()
    //addMessage('Added message')
  }
}

export default connect(
  state => new Object({
    post: state.post,
  }),
  dispatch => new Object({
    postAction: bindActionCreators(PostAction, dispatch),
  })
)(App)
