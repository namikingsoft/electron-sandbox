const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const envNodePath = `NODE_PATH=${config.dir.work.test}`
const mochaCommand = `${envNodePath} mocha ${config.dir.work.test}/**/*.spec.js`

gulp.task('test', ['script:test'], () => {
  gulp.start([
    'test:shell:mocha'
  ])
})
gulp.task('test:watch', ['script:test'], () => {
  gulp.start([
    'script:test:watch',
    'test:shell:mocha:watch',
  ])
})
gulp.task('test:shell:mocha', $.shell.task([
  `${mochaCommand}`
]))
gulp.task('test:shell:mocha:watch', $.shell.task([
  `${mochaCommand} --reporter min --watch`
]))
