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

gulp.task('clean:dist', done => {
  del(config.dir.dist).then(pathes => done())
})

gulp.task('clean:release', done => {
  del(config.dir.release).then(pathes => done())
})

gulp.task('clean:test', done => {
  del(config.dir.test).then(pathes => done())
})

gulp.task('clean:server', done => {
  del(config.dir.server).then(pathes => done())
})
