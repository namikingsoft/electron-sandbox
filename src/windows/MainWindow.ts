import {
  app,
  screen,
  BrowserWindow,
} from 'electron'
import {
  BASE_URL,
} from '../constants/AppConst'
import GlobalRepository from '../domains/GlobalRepository'

// alias class @todo cannot define 'private window: BrowserWindow'
class Window extends BrowserWindow {}

export default class MainWindow {
  private window: Window

  private constructor() {
    const screenSize = screen.getPrimaryDisplay().size
    this.window = new BrowserWindow({
      width: screenSize.width,
      height: screenSize.height,
      center: true,
      transparent: true,
      frame: false,
      resizable: false,
      alwaysOnTop: true,
    })
    this.window.loadURL(BASE_URL)
    this.window.setVisibleOnAllWorkspaces(true)
    this.window.on('closed', () => app.quit())

    // only darwin @todo tsd
    const thisAny = <any>this.window
    thisAny.setIgnoreMouseEvents(true)

    // enable devtools
    //this.window.webContents.openDevTools()
    //this.window.setAlwaysOnTop(false)
    //thisAny.setIgnoreMouseEvents(false)
  }

  close() {
    this.window.close()
  }

  reload() {
    this.window.reload()
  }

  // singleton
  private static instance: MainWindow
  static getInstance() {
    if (!MainWindow.instance) {
      MainWindow.instance = new MainWindow()
      GlobalRepository.mainWindow = MainWindow.instance
    }
    return MainWindow.instance
  }
}
