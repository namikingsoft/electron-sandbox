const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const packager = require('electron-packager')
const browserify = require('browserify')
const config = require('../config')

gulp.task('package', ['package:pre'], () => {
  gulp.start(config.package.platforms.map(x => `package:electron:${x}`))
})
gulp.task('package:electron', () => {
  gulp.start(config.package.platforms.map(x => `package:electron:${x}`))
})
config.package.platforms.forEach(platform => {
  gulp.task(`package:${platform}`, ['package:pre'], () => {
    gulp.start(`package:electron:${platform}`)
  })
  gulp.task(`package:electron:${platform}`, done => {
    packager({
      dir: config.dir.dist,
      out: config.dir.release,
      name: config.package.name,
      arch: config.package.arch,
      version: config.package.version,
      platform,
      overwrite: true
    }, (err, path) => {
      done()
    })
  })
})

gulp.task('package:pre', ['package:pre:finishing'], done => done())
gulp.task('package:pre:finishing', ['package:pre:browserify'], done => {
  del(config.browserify.removes).then(pathes => done())
})
gulp.task('package:pre:browserify', ['package:pre:build'], $.shell.task([
  `cp ${config.browserify.entry} ${config.browserify.tmpfile}`,
  `browserify ${config.browserify.tmpfile} -o ${config.browserify.output} -g uglifyify --im --no-detect-globals --node`,
]))
gulp.task('package:pre:build', [
  'script',
  'style',
  'asset',
  'html',
], done => done())
