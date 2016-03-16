import User from 'domains/User'
import * as assert from 'power-assert'

describe('User', function() {

  let user: User

  before(() => {
    user = new User({
      id: 'ID',
      name: 'Name',
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(user instanceof User)
    })
  })

  describe('id', () => {
    it('should be return initial value', () => {
      assert(user.id === 'ID')
    })
  })

  describe('name', () => {
    it('should be return initial value', () => {
      assert(user.name === 'Name')
    })
  })
})
