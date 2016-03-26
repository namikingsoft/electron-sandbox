/// <reference path="../reference.d.ts" />
import {
  SettingAction,
  UPDATE_SETTING,
  CANCEL_SETTING,
  SAVE_SETTING,
} from "../actions/SettingAction"
import {
  DEFAULT_REMOVE_MSEC,
  DEFAULT_NOTIFY_TYPE,
} from "../app.const"
import Setting from "../domains/Setting"
import GlobalRepository from "../domains/GlobalRepository"

const initialState: Setting = new Setting({
  slackToken: localStorage["slackToken"] || "",
  notifyType: localStorage["notifyType"] || DEFAULT_NOTIFY_TYPE,
  removeMsec: localStorage["removeMsec"] || DEFAULT_REMOVE_MSEC,
})

export default function setting(
  state: Setting = initialState,
  action: SettingAction
): Setting {
  switch (action.type) {
  case UPDATE_SETTING:
    return action.setting
  case CANCEL_SETTING:
    GlobalRepository.settingWindow.close()
    break
  case SAVE_SETTING:
    localStorage["slackToken"] = state.slackToken
    localStorage["notifyType"] = state.notifyType
    localStorage["removeMsec"] = state.removeMsec
    GlobalRepository.mainWindow.reload()
    GlobalRepository.settingWindow.close()
    break
  }
  return state
}
