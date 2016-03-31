import Setting from 'domains/Setting'
import * as assert from 'power-assert'

describe('Setting', function() {

  let setting: Setting

  before(() => {
    setting = new Setting({
      slackToken: 'SlackToken',
      slackTokenAlt: 'SlackTokenAlt',
      notifyType: 'NotifyType',
      removeMsec: 1234,
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

  describe('slackTokenAlt', () => {
    it('should be return initial value', () => {
      assert(setting.slackTokenAlt === 'SlackTokenAlt')
    })
  })

  describe('notifyType', () => {
    it('should be return initial value', () => {
      assert(setting.notifyType === 'NotifyType')
    })
  })

  describe('removeMsec', () => {
    it('should be return initial value', () => {
      assert(setting.removeMsec === 1234)
    })
  })
})
