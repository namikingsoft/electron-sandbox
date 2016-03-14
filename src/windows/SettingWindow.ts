import {
  app,
  screen,
  BrowserWindow,
} from 'electron'

import {
  BASE_URL,
} from '../constants/AppConst'

// alias class @todo cannot define 'private window: BrowserWindow'
class Window extends BrowserWindow {}

export default class SettingWindow {
  private window: Window

  constructor() {
    const screenSize = screen.getPrimaryDisplay().size
    this.window = new BrowserWindow({
      width: 600,
      height: 400,
      center: true,
      frame: false,
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
    })
    this.window.loadURL(`${BASE_URL}#setting`)
  }
}
