import {
  SettingAction,
  UPDATE_SETTING,
  CLOSE_SETTING,
} from '../actions/SettingAction'
import Setting from '../domains/Setting'
import GlobalRepository from '../domains/GlobalRepository'
import {remote} from 'electron'

const initialState: Setting = new Setting({
  slackToken: localStorage['slackToken'] || '',
})

export default function setting(
  state: Setting = initialState,
  action: SettingAction
): Setting {
  switch (action.type) {
  case UPDATE_SETTING:
    return action.setting
  case CLOSE_SETTING:
    localStorage['slackToken'] = state.slackToken
    GlobalRepository.mainWindow.reload()
    remote.getCurrentWindow().close()
  }
  return state
}
