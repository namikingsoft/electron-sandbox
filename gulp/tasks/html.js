const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = isWatch => {
  gulp.src(config.src.html)
  .pipe(isWatch? $.watch(config.src.html, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(!isWatch, $.useref()))
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('html',       () => build())
gulp.task('html:watch', () => build(true))
