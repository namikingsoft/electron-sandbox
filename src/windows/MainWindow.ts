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
    this.window.setVisibleOnAllWorkspaces(true)
    this.window.on('closed', () => app.quit())
    this.window.loadURL(BASE_URL)

    // only darwin @todo tsd
    const thisAny = <any>this.window
    thisAny.setIgnoreMouseEvents(true)

    // enable devtools on development
    if (process.env.NODE_ENV === 'develop') {
      this.window.webContents.openDevTools()
    }
  }

  close() {
    this.window.close()
  }

  reload() {
    this.window.reload()
    this.window.loadURL(BASE_URL)
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
