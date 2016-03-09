"use strict"
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const electron = require('electron-connect').server.create()
const config = require('../config')

const pretask = [
  'script:server',
  'style:server',
  'image:server',
  'html:server',
]

gulp.task('server', pretask, () => {
  electron.start();
  gulp.start('watch')
  setTimeout(() => {
  // watch after 5 second for prebuild
    let isRestart = false
    $.watch(config.server.restart, () => isRestart = true)
    $.watch(`${config.dir.server}/**/*`, () => {
      if (isRestart) {
        electron.restart()
        isRestart = false
      } else {
        electron.reload()
      }
    })
  }, 5000)
})
