import Letter from 'domains/Letter'
import User from 'domains/User'
import Channel from 'domains/Channel'
import Message from 'domains/Message'
import * as assert from 'power-assert'

describe('Letter', function() {

  let letter: Letter

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
    letter = new Letter({
      user, channel, message,
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(letter instanceof Letter)
    })
  })

  describe('id', () => {
    it('should be return identify string', () => {
      assert(/[0-9a-f\-]+/.test(letter.id))
    })
  })

  describe('user', () => {
    it('should be return initial value', () => {
      assert(letter.user === 'User')
    })
  })

  describe('channel', () => {
    it('should be return initial value', () => {
      assert(letter.channel === 'Channel')
    })
  })

  describe('message', () => {
    it('should be return initial value', () => {
      assert(letter.message === 'Text')
    })
  })

  describe('textDisplay', () => {
    it('should be return text for display', () => {
      assert(/[0-9a-f\-]+/.test(letter.id.toString()))
    })
  })
})
