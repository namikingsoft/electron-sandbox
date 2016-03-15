/// <reference path="../typings/main.d.ts" />
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import {
  app,
  Menu,
  Tray,
  screen,
} from 'electron'
import MainWindow from './windows/MainWindow'
import SettingWindow from './windows/SettingWindow'

if (process.env.NODE_ENV === 'develop') {
  // source map for node
  require('source-map-support').install()
}

app.on('ready', () => {
  // windows
  const mainWindow = MainWindow.getInstance()
  const settingWindow = SettingWindow.getInstance()

  // tray
  const tray = new Tray(`${__dirname}/images/icon.png`)
  const menu = Menu.buildFromTemplate([
    {label: "Setting", click: () => settingWindow.show()},
    {label: "Quit", click: () => app.quit()},
  ])
  tray.setToolTip(app.getName())
  tray.setContextMenu(menu)

  // menu
  Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
    ]}, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
    ]},
  ]))
})
