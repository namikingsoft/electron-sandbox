const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

gulp.task('html', () => {
  gulp.src(`${config.srcDir}/**/*.html`)
  .pipe($.plumber())
  .pipe(gulp.dest(config.destDir))
})

gulp.task('html:watch', () => {
  gulp.start('html')
  $.watch(`${config.srcDir}/**/*.html`, () => gulp.start('html'))
})
