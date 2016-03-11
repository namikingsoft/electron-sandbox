import freeze from 'decorators/freeze'
import * as assert from 'power-assert'

describe('freeze', function() {

  @freeze
  class Sample {
    val: number|Object
    constructor(val: number|Object) {
      this.val = val
    }
  }

  it('should be inject constructor that return immutable object', () => {
    context('number', () => {
      const sample = new Sample(1)
      assert(sample.val === 1)
      assert.throws(() => {
        sample.val = 2
      })
    })
    context('object', () => {
      const sample = new Sample({key: 1})
      assert(sample.val.key === 1)
      assert.throws(() => {
        sample.val.key = 2
      })
    })
  })
})
