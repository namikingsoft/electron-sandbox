import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as SettingAction from '../actions/SettingAction'
import Setting from '../domains/Setting'
import TextField from '../components/TextField'
import Button from '../components/Button'

interface Props {
  setting?: Setting
  action?: {
    updateSetting: (setting: Setting)=>void,
    cancelSetting: ()=>void,
    saveSetting: ()=>void,
  }
}

class SettingContainer extends Component<Props, any> {
  render() {
    const {setting, action} = this.props
    return (
      <div className="SettingContainer pure-form pure-form-aligned">
        <TextField
          label="Slack Token"
          value={setting.slackToken}
          onChange={slackToken => this.changeValue({slackToken})} />
        <TextField
          label="Notify Type"
          value={setting.notifyType}
          onChange={notifyType => this.changeValue({notifyType})} />
        <div className="Button pure-controls">
          <Button onClick={action.saveSetting} mode="primary">Save</Button>
          <Button onClick={action.cancelSetting}>Cancel</Button>
        </div>
      </div>
    )
  }

  changeValue(obj: any) {
    const {setting} = this.props
    this.props.action.updateSetting(
      new Setting({
        slackToken: obj.slackToken || setting.slackToken,
        notifyType: obj.notifyType || setting.notifyType,
      })
    )
  }
}

export default connect(
  state => new Object({
    setting: state.setting,
  }),
  dispatch => new Object({
    action: bindActionCreators(SettingAction, dispatch),
  })
)(SettingContainer)
