import Letter from 'domains/Letter'
import Team from 'domains/Team'
import User from 'domains/User'
import Channel from 'domains/Channel'
import Message from 'domains/Message'
import * as assert from 'power-assert'

describe('Letter', function() {

  let letter: Letter
  let team: Team
  let user: User
  let channel: Channel
  let message: Message

  before(() => {
    team = new Team({
      id: 'ID',
      name: 'Team',
      domain: 'Domain',
    })
    user = new User({
      id: 'ID',
      name: 'User',
    })
    channel = new Channel({
      id: 'ID',
      name: 'Channel',
    })
    message = new Message('Text')
    letter = new Letter({
      team, user, channel, message,
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(letter instanceof Letter)
    })
  })

  describe('id', () => {
    it('should be return identify string', () => {
      assert(typeof letter.id === 'string')
      assert(letter.id.length > 0)
    })
  })

  describe('team', () => {
    it('should be return initial value', () => {
      assert(letter.team === team)
    })
  })

  describe('user', () => {
    it('should be return initial value', () => {
      assert(letter.user === user)
    })
  })

  describe('channel', () => {
    it('should be return initial value', () => {
      assert(letter.channel === channel)
    })
  })

  describe('message', () => {
    it('should be return initial value', () => {
      assert(letter.message === message)
    })
  })

  describe('textDisplay', () => {
    it('should be return text for display', () => {
      assert(/[0-9a-f\-]+/.test(letter.id.toString()))
    })
  })
})
