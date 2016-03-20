import Post from 'domains/Post'
import Letter from 'domains/Letter'
import User from 'domains/User'
import Channel from 'domains/Channel'
import Message from 'domains/Message'
import * as assert from 'power-assert'

describe('Letter', function() {

  let post: Post
  let letter1: Letter
  let letter2: Letter
  let letters: Array<Letter>

  before(() => {
    const user = new User({
      id: 'ID',
      name: 'User',
    })
    const channel = new Channel({
      id: 'ID',
      name: 'Channel',
    })
    const message = new Message('Text')
    letter1 = new Letter({user, channel, message})
    letter2 = new Letter({user, channel, message})
    letters = [letter1, letter2]
    post = new Post({letters})
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(post instanceof Post)
    })
  })

  describe('letters', () => {
    it('should be return initial value', () => {
      assert(post.letters === letters)
    })
  })
})
