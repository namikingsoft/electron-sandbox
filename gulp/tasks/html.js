const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (dist, isWatch) => {
  return gulp.src(config.src.html)
  .pipe(isWatch? $.watch(config.src.html, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(!isWatch, $.useref()))
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('html',        () => build(config.dir.dist))
gulp.task('html:server', () => build(config.dir.server))
gulp.task('html:watch',  () => build(config.dir.server, true))
