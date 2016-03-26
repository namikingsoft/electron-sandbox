import {remote} from "electron"
import MainWindow from "../windows/MainWindow"
import SettingWindow from "../windows/SettingWindow"

const MAIN_WINDOW_KEY = "__MAIN_WINDOW"
const SETTING_WINDOW_KEY = "__SETTING_WINDOW"

export default class GlobalRepository {

  static get mainWindow(): MainWindow {
    return this.get(MAIN_WINDOW_KEY)
  }
  static set mainWindow(mainWindow: MainWindow) {
    this.set(MAIN_WINDOW_KEY, mainWindow)
  }
  static get settingWindow(): SettingWindow {
    return this.get(SETTING_WINDOW_KEY)
  }
  static set settingWindow(settingWindow: SettingWindow) {
    this.set(SETTING_WINDOW_KEY, settingWindow)
  }

  private static get(key: string): any {
    if (remote) {
      return remote.getGlobal(<string>key)
    } else {
      const globalAny = <any>global
      return globalAny[key]
    }
  }

  private static set(key: string, value: any): void {
    if (remote) {
      throw new Error("use only main process")
    } else {
      const globalAny = <any>global
      globalAny[key] = value
    }
  }
}
