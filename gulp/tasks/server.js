"use strict"
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const electron = require('electron-connect').server.create()
const config = require('../config')

gulp.task('server', () => {
  gulp.start('watch')
  electron.start();

  // watch after 5 second for prebuild
  setTimeout(() => {
    let isRestart = false
    $.watch(config.server.restart, () => isRestart = true)
    $.watch(`${config.dir.server}/**/*`, () => {
      isRestart? electron.restart() : electron.reload()
      isRestart = false
    })
  }, 5000)
})
