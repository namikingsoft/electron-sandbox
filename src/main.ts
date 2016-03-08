/// <reference path="../typings/main.d.ts" />
import {app, BrowserWindow} from 'electron'
import * as sourcemap from 'source-map-support'
import 'babel-polyfill'

sourcemap.install()

app.on('ready', () => {
  const mainWindow: any = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
  });
  mainWindow.loadURL('file://' + __dirname + '/../index.html')
  mainWindow.setVisibleOnAllWorkspaces(true)
  //mainWindow.setIgnoreMouseEvents(true)
  //mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function() {
    app.quit()
  })
});

app.on('window-all-closed', () => {
  app.quit();
})
