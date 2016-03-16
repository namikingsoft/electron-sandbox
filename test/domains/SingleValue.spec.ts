import SingleValue from 'domains/SingleValue'
import * as assert from 'power-assert'

describe('SingleValue', function() {

  let single: SingleValue<number>

  before(() => {
    single = new SingleValue<number>(1234)
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(single instanceof SingleValue)
    })
  })

  describe('valueOf', () => {
    it('should be return initial value', () => {
      assert(single.valueOf() === 1234)
    })
  })

  describe('toString', () => {
    it('should be return initial value to String', () => {
      assert(single.toString() === '1234')
    })
  })

  describe('equals', () => {
    it('should be return initial value to String', () => {
      const yes = new SingleValue<number>(1234)
      const no = new SingleValue<number>(12345)
      assert(single.equals(yes))
      assert(!single.equals(no))
      assert(single !== yes)
    })
  })
})
