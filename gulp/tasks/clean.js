const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const config = require('../config')

gulp.task('clean', done => {
  del([
    config.dir.dist,
    config.dir.release,
    config.dir.work.test,
    config.dir.work.server,
  ]).then(pathes => done())
})
