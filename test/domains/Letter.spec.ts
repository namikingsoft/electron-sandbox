import Letter from 'domains/Letter'
import * as assert from 'power-assert'

describe('Letter', function() {

  let letter: Letter

  before(() => {
    letter = new Letter({
      text: 'Text',
      user: 'User',
      channel: 'Channel',
    })
  })

  describe('new', () => {
    it('should be new instance', () => {
      assert(letter instanceof Letter)
    })
  })

  describe('id', () => {
    it('should be return identify string', () => {
      assert(/[0-9a-f\-]+/.test(letter.id.toString()))
    })
  })

  describe('text', () => {
    it('should be return initial value', () => {
      assert(letter.text === 'Text')
    })
  })

  describe('user', () => {
    it('should be return initial value', () => {
      assert(letter.user === 'User')
    })
  })

  describe('channel', () => {
    it('should be return initial value', () => {
      assert(letter.channel === 'Channel')
    })
  })

  describe('textDisplay', () => {
    it('should be return text for display', () => {
      assert(/[0-9a-f\-]+/.test(letter.id.toString()))
    })
  })
})
