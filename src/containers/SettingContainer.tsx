/// <reference path="../reference.d.ts" />
import * as React from "react"
import {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as SettingAction from "../actions/SettingAction"
import Setting from "../domains/Setting"
import TextField from "../components/TextField"
import RadioSelect from "../components/RadioSelect"
import Button from "../components/Button"
import GlobalRepository from "../domains/GlobalRepository"

interface Props {
  setting?: Setting
  action?: {
    updateSetting: (setting: Setting) => void,
    cancelSetting: () => void,
    saveSetting: () => void,
  }
}

class SettingContainer extends Component<Props, any> {

  public render() {
    const {setting, action} = this.props
    return (
      <div className="SettingContainer">
        <div className="pure-form pure-form-aligned">
          <div className="pure-control-group">
            <label>Slack Token</label>
            <TextField
              placeholder="Slack Token"
              value={setting.slackToken}
              hideFirst={true}
              onChange={slackToken => this.changeValue({slackToken})} />
            <Button onClick={() => this.openOAuth()}>OAuth</Button>
          </div>
          <div className="pure-control-group">
            <label>Slack Token Alt</label>
            <TextField
              placeholder="Slack Token"
              value={setting.slackTokenAlt}
              hideFirst={true}
              onChange={slackTokenAlt => this.changeValue({slackTokenAlt})} />
            <Button onClick={() => this.openOAuthAlt()}>OAuth</Button>
          </div>
          <div className="pure-control-group">
            <label>Remove Msec</label>
            <TextField
              placeholder="Remove Msec"
              value={setting.removeMsec.toString()}
              onChange={removeMsec => this.changeValue({removeMsec})} />
          </div>
          <div className="pure-control-group">
            <label>Notify Type</label>
            <RadioSelect
              name="notifyType"
              value={setting.notifyType}
              onChange={notifyType => this.changeValue({notifyType})}
              data={[
                {label: "Typing", value: "typing"},
                {label: "Stream", value: "stream"},
              ]} />
          </div>
          <div className="Button pure-controls">
            <Button onClick={action.saveSetting} mode="primary">Save</Button>
            <Button onClick={action.cancelSetting}>Cancel</Button>
          </div>
        </div>
      </div>
    )
  }

  private changeValue(obj: any) {
    const {setting} = this.props
    if (obj.slackToken === undefined) {
      obj.slackToken = setting.slackToken
    }
    if (obj.slackTokenAlt === undefined) {
      obj.slackTokenAlt = setting.slackTokenAlt
    }
    if (obj.notifyType === undefined) {
      obj.notifyType = setting.notifyType
    }
    if (obj.removeMsec === undefined) {
      obj.removeMsec = setting.removeMsec
    }
    this.props.action.updateSetting(new Setting(obj))
  }

  private openOAuth() {
    GlobalRepository.settingWindow.openOAuth()
    .then(slackToken => this.changeValue({slackToken}))
    .catch(err => alert("Error"))
  }

  private openOAuthAlt() {
    GlobalRepository.settingWindow.openOAuth()
    .then(slackTokenAlt => this.changeValue({slackTokenAlt}))
    .catch(err => alert("Error"))
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
