"use strict"
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const electron = require('electron-connect').server.create()
const config = require('../config')

const pretask = [
  'script:server',
  'style:server',
  'asset:server',
  'html:server',
]

gulp.task('server', pretask, () => {
  electron.start();
  gulp.start([
    'script:server:watch',
    'style:server:watch',
    'asset:server:watch',
    'html:server:watch',
  ])
  { // watch
    let isCoolDown = false
    $.watch(`${config.dir.work.server}/**/*`, () => {
      if (isCoolDown) {
        return
      }
      isCoolDown = true
      setTimeout(() => isCoolDown = false, config.server.coolDownMsec)
      setTimeout(() => electron.restart(), config.server.restartDelayMsec)
      // @todo strange motion when multiple window
      //electron.reload()
    })
  }
})
