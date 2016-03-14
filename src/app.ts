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

  // tray
  const tray = new Tray(`${__dirname}/images/icon.png`)
  const menu = Menu.buildFromTemplate([
    {label: "設定", click: () => {
      const settingWindow = new SettingWindow()
    }},
    {label: "終了", click: () => mainWindow.close()},
  ]);
  tray.setToolTip(app.getName());
  tray.setContextMenu(menu);
});
