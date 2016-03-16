import Channel from 'domains/Channel'
import * as assert from 'power-assert'

describe('Channel', function() {

  let channel: Channel

  before(() => {
    channel = new Channel({
      id: 'ID',
      name: 'Name',
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(channel instanceof Channel)
    })
  })

  describe('id', () => {
    it('should be return initial value', () => {
      assert(channel.id === 'ID')
    })
  })

  describe('name', () => {
    it('should be return initial value', () => {
      assert(channel.name === 'Name')
    })
  })
})
