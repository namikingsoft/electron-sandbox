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
    addMessage: (text: string)=>void,
  }
}

class App extends Component<Props, any> {
  constructor() {
    super()
    setTimeout(() => {
      const {addMessage} = this.props.postAction
      addMessage('Added message')
    }, 3000)
  }

  render() {
    const {post} = this.props
    return (
      <div className="layout-app">
        <PostCanvas post={post} />
      </div>
    )
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
