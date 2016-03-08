const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

gulp.task('html', () => {
  gulp.src(config.src.html)
  .pipe($.plumber())
  .pipe(gulp.dest(config.dest.dir))
})

gulp.task('html:watch', () => {
  gulp.start('html')
  $.watch(config.src.html, () => gulp.start('html'))
})
