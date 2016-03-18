import UniqueID from 'domains/UniqueID'
import * as assert from 'power-assert'

describe('UniqueID', function() {

  let uid1: UniqueID
  let uid2: UniqueID

  before(() => {
    uid1 = new UniqueID('ID')
    uid2 = new UniqueID()
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(uid1 instanceof UniqueID)
      assert(uid2 instanceof UniqueID)
    })
  })

  describe('valueOf', () => {
    it('should be return initial value', () => {
      assert(uid1.valueOf() === 'ID')
    })
    it('should be return identify string', () => {
      // xxx1-xxx2-xxx3-xxx4-xxx5
      assert(/^([0-9a-f]+\-){4}[0-9a-f]+$/.test(uid2.valueOf()))
    })
  })
})
