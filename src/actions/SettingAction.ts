import Action, {Dispatcher, Dispatch} from './Action'
import Setting from '../domains/Setting'

export interface SettingAction extends Action {
  type: string
  setting?: Setting
}

export function updateSetting(setting: Setting) {
  return {type: UPDATE_SETTING, setting}
}

export function closeSetting(): SettingAction {
  return {type: CLOSE_SETTING}
}

export const CLOSE_SETTING = 'CLOSE_SETTING'
export const UPDATE_SETTING = 'UPDATE_SETTING'
