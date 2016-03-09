/// <reference path="../typings/main.d.ts" />
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import {
  app,
  Menu,
  Tray,
  BrowserWindow,
} from 'electron'

// source map for node
if (process.env.NODE_ENV === 'develop') {
  require('source-map-support').install()
}

app.on('ready', () => {
  // window
  const mainWindow: any = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    resizable: false,
    //alwaysOnTop: true,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //mainWindow.setVisibleOnAllWorkspaces(true)
  mainWindow.on('closed', () => app.quit())
  //mainWindow.setIgnoreMouseEvents(true)
  mainWindow.webContents.openDevTools()

  // tray
  const tray = new Tray(`${__dirname}/images/icon.png`)
  const menu = Menu.buildFromTemplate([
    {label: "終了", click: () => mainWindow.close()}
  ]);
  tray.setToolTip(app.getName());
  tray.setContextMenu(menu);
});
