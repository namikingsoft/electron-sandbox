const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const packager = require('electron-packager')
const browserify = require('browserify')
const runSequence = require('run-sequence')
const config = require('../config')

// build electron
gulp.task('package', ['package:pre'], () => {
  gulp.start('package:electron')
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

// pre build
gulp.task('package:pre', done => runSequence(
  'clean:dist',
  'package:pre:build',
  'package:pre:browserify:app',
  'package:pre:browserify:front',
  'package:pre:finishing',
  done
))
gulp.task('package:pre:finishing', done => {
  del(config.browserify.removes).then(pathes => done())
})
gulp.task('package:pre:browserify:app', $.shell.task(`
  cp ${config.browserify.app.entry} ${config.browserify.app.tmpfile}
  browserify ${config.browserify.app.tmpfile} \
    -t envify --im --no-detect-globals --node \
  |  uglifyjs -c warnings=false -d DEBUG=false \
  > ${config.browserify.app.output}
`))
gulp.task('package:pre:browserify:front', $.shell.task(`
  cp ${config.browserify.front.entry} ${config.browserify.front.tmpfile}
  browserify ${config.browserify.front.tmpfile} \
    -t envify --im --no-detect-globals --node \
  |  uglifyjs -c warnings=false -d DEBUG=false \
  > ${config.browserify.front.output}
`))
gulp.task('package:pre:build', [
  'script',
  'style',
  'asset',
  'html',
], done => done())
