import Message from 'domains/Message'
import * as assert from 'power-assert'

describe('Message', function() {

  let message: Message

  before(() => {
    message = new Message('Text<link>')
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(message instanceof Message)
    })
    it('should be subclass of SingleValue')
  })

  describe('toDisplay', () => {
    it('should be return value reduced <.*>', () => {
      assert(message.toDisplay() === 'Text')
    })
  })
})
