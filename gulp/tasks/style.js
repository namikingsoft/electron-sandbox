const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

gulp.task('style', () => {
  gulp.src(`${config.srcDir}/**/*.styl`)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.stylus({compress: true}))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.destDir))
})

gulp.task('style:watch', () => {
  gulp.start('style')
  $.watch(`${config.srcDir}/**/*.styl`, () => gulp.start('style'))
})
