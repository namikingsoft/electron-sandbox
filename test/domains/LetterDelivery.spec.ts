import LetterDelivery from 'domains/LetterDelivery'
import * as assert from 'power-assert'

describe('LetterDelivery', function() {

  let delivery: LetterDelivery

  before(() => {
    delivery = new LetterDelivery('token')
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(delivery instanceof LetterDelivery)
    })
  })

  describe('onPost', () => {
    it('should be callback when recieved message from slack')
  })
})
