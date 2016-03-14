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
    closeSetting: ()=>void,
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
          onChange={text => this.changeSlackToken(text)} />
        <Button onClick={() => action.closeSetting()}>適応する</Button>
      </div>
    )
  }

  changeSlackToken(text: string) {
    this.props.action.updateSetting(
      new Setting({
        slackToken: text,
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
