const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

gulp.task('style', () => {
  gulp.src(config.src.style)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.stylus({compress: true}))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.dest.dir))
})

gulp.task('style:watch', () => {
  gulp.start('style')
  $.watch(config.src.style, () => gulp.start('style'))
})
