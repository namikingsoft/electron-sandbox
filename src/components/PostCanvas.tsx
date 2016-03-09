import * as React from 'react'
import {Component, PropTypes} from 'react'
import Message from './Message'
import Post from '../domains/Post'

interface Props {
  post: Post
}

export default class PostCanvas extends Component<Props, any> {
  render() {
    const {post} = this.props
    return (
      <div>
        {post.letters.map(x => <Message key={x.text} letter={x} />)}
      </div>
    )
  }
}
