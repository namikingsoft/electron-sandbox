import {
  app,
  screen,
  BrowserWindow,
} from 'electron'
import {
  BASE_URL,
} from '../app.const'
import GlobalRepository from '../domains/GlobalRepository'

// alias class @todo cannot define 'private window: BrowserWindow'
class Window extends BrowserWindow {}

export default class SettingWindow {
  private window: Window

  private constructor() {
    const screenSize = screen.getPrimaryDisplay().size
    this.window = new BrowserWindow({
      width: 600,
      height: 200,
      center: true,
      frame: false,
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
      show: false,
    })
    this.window.setVisibleOnAllWorkspaces(true)
    this.window.on('closed', () => app.quit())
    this.window.loadURL(`${BASE_URL}#setting`)
  }

  show() {
    this.window.show()
  }

  hide() {
    this.window.hide()
    this.window.reload()
  }

  // singleton
  private static instance: SettingWindow
  static getInstance() {
    if (!SettingWindow.instance) {
      SettingWindow.instance = new SettingWindow()
      GlobalRepository.settingWindow = SettingWindow.instance
    }
    return SettingWindow.instance
  }
}
