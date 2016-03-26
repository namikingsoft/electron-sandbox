/// <reference path="../reference.d.ts" />
import Action, {Dispatcher, Dispatch} from "./Action"
import Setting from "../domains/Setting"

export interface SettingAction extends Action {
  type: string
  setting?: Setting
}

export function updateSetting(setting: Setting) {
  return {type: UPDATE_SETTING, setting}
}

export function cancelSetting(): SettingAction {
  return {type: CANCEL_SETTING}
}

export function saveSetting(): SettingAction {
  return {type: SAVE_SETTING}
}

export const UPDATE_SETTING = "UPDATE_SETTING"
export const CANCEL_SETTING = "CANCEL_SETTING"
export const SAVE_SETTING = "SAVE_SETTING"
