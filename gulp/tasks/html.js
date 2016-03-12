const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (dest, isWatch) => {
  return gulp.src(config.src.html)
  .pipe(isWatch? $.watch(config.src.html, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(!isWatch, $.useref()))
  .pipe(gulp.dest(dest))
}

gulp.task('html',              () => build(config.dir.dist))
gulp.task('html:server',       () => build(config.dir.work.server))
gulp.task('html:server:watch', () => build(config.dir.work.server, true))
