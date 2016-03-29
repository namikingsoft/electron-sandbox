/// <reference path="../reference.d.ts" />
import {
  BrowserWindow,
} from "electron"
import {
  BASE_URL,
} from "../app.const"
import GlobalRepository from "../domains/GlobalRepository"

// alias class @todo cannot define "private window: BrowserWindow"
class Window extends BrowserWindow {}

export default class SettingWindow {

  private static instance: SettingWindow
  private window: Window

  public static getInstance() {
    if (!SettingWindow.instance) {
      SettingWindow.instance = new SettingWindow()
      GlobalRepository.settingWindow = SettingWindow.instance
    }
    return SettingWindow.instance
  }

  private constructor() {
    this.window = new BrowserWindow({
      width: 600,
      height: 240,
      center: true,
      frame: false,
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
      show: false,
    })
    this.window.setVisibleOnAllWorkspaces(true)
    this.window.loadURL(`${BASE_URL}#setting`)

    // only darwin @todo tsd
    const thisAny = <any>this.window
    thisAny.setHasShadow(false)

    // enable devtools on development
    if (process.env.NODE_ENV === "develop") {
      this.window.webContents.openDevTools()
    }
  }

  public show() {
    this.window.show()
  }

  public close() {
    SettingWindow.instance = undefined
    GlobalRepository.settingWindow = undefined
    this.window.close()
  }
}
