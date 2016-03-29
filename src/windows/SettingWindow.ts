/// <reference path="../reference.d.ts" />
import {
  BrowserWindow,
} from "electron"
import * as http from 'http'
import * as request from 'request'
import {
  BASE_URL,
} from "../app.const"
import GlobalRepository from "../domains/GlobalRepository"

const OAUTH_AUTHORIZE_URL = "https://slack.com/oauth/authorize"
const OAUTH_ACCESS_URL = "https://slack.com/api/oauth.access"
const OAUTH_LOCAL_PORT = 13245
const OAUTH_SCOPE = "client"
const OAUTH_REDIRECT_URL = `http://localhost:${OAUTH_LOCAL_PORT}`

type CallBack = (err: Error, token: string) => void
interface AuthorizeData {
  code: string
  state: string
}
interface AccessData {
  ok: boolean
  access_token: string
  scope: string
}

// alias class @todo cannot define "private window: BrowserWindow"
class Window extends BrowserWindow {}

export default class SettingWindow {
  private static instance: SettingWindow
  private window: Window
  private server: http.Server

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
    this.closeServer()
    this.window.close()
  }

  public openOAuth() {
    let serverResponse: any // @todo messy
    return new Promise<string>((resolve, reject) => {
      const state = String(Math.random())
      require('open')(
        OAUTH_AUTHORIZE_URL
        + `?client_id=${process.env.SLACK_CLIENT_ID}`
        + `&scope=${OAUTH_SCOPE}`
        + `&state=${state}`
        + `&redirect_url=${OAUTH_REDIRECT_URL}`
      )
      resolve(state)
    })
    .then(state => new Promise<string>((resolve, reject) => {
      this.closeServer()
      this.server = http.createServer()
      this.server.on('request', (req: any, res: any) => {
        serverResponse = res
        const data: AuthorizeData = require('url').parse(req.url, true).query
        if (data.state === state) {
          resolve(data.code)
        } else {
          reject(new Error('not match state'))
        }
      })
      this.server.listen(OAUTH_LOCAL_PORT);
    }))
    .then(code => new Promise<string>((resolve, reject) => {
      const url = OAUTH_ACCESS_URL
      const form = {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code,
      }
      request.post({url, form}, (err, res, body) => {
        if (err) {
          serverResponse.writeHead(403, {'Content-Type': 'text/plain'})
          serverResponse.end('Access Token Setting is Error')
          reject(err)
        } else {
          serverResponse.writeHead(200, {'Content-Type': 'text/plain'})
          serverResponse.end(`
            Access Token Setting is Successful. Please close this window.
          `)
          this.closeServer()
          const data: AccessData = JSON.parse(body)
          resolve(data.access_token)
        }
      })
    }))
    .catch(err => this.closeServer())
  }

  private closeServer() {
    if (this.server) {
      this.server.close()
    }
  }
}
