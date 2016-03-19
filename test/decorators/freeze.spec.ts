import freeze from 'decorators/freeze'
import * as assert from 'power-assert'

describe('freeze', function() {

  @freeze
  class SampleNumber {
    val: number
    constructor(val: number) {
      this.val = val
    }
  }
  @freeze class SampleObject {
    val: {key: number}
    constructor(val: {key: number}) {
      this.val = val
    }
  }

  it('should be inject constructor that return immutable object', () => {
    context('number', () => {
      const sample = new SampleNumber(1)
      assert(sample.val === 1)
      assert.throws(() => {
        sample.val = 2
      })
    })
    context('object', () => {
      const sample = new SampleObject({key: 1})
      assert(sample.val.key === 1)
      assert.throws(() => {
        sample.val.key = 2
      })
    })
  })

  it('does not change constructor name from original', () => {
    assert(SampleObject.name === 'SampleObject')
  })
})
