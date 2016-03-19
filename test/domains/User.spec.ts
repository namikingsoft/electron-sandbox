import User from 'domains/User'
import {NO_IMAGE_URL} from 'app.const'
import * as assert from 'power-assert'

describe('User', function() {

  let user: User
  let userNoImage: User

  before(() => {
    user = new User({
      id: 'ID',
      name: 'Name',
      image: 'Image',
    })
    userNoImage = new User({
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

  describe('image', () => {
    context('when defined', () => {
      it('should be return initial value', () => {
        assert(user.image === 'Image')
      })
    })
    context('when undefined', () => {
      it('should be return no image url', () => {
        assert(userNoImage.image === NO_IMAGE_URL)
      })
    })
  })
})
