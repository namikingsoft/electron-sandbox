import Setting from 'domains/Setting'
import * as assert from 'power-assert'

describe('Setting', function() {

  let setting: Setting

  before(() => {
    setting = new Setting({
      slackToken: 'SlackToken',
      notifyType: 'NotifyType',
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(setting instanceof Setting)
    })
  })

  describe('slackToken', () => {
    it('should be return initial value', () => {
      assert(setting.slackToken === 'SlackToken')
    })
  })

  describe('name', () => {
    it('should be return initial value', () => {
      assert(setting.notifyType === 'NotifyType')
    })
  })
})
