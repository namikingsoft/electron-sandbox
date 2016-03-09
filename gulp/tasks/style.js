const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (dest, isWatch) => {
  return gulp.src(config.src.style)
  .pipe(isWatch? $.watch(config.src.style, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.sourcemaps.init())
  .pipe($.stylus({compress: isWatch? false : true}))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(dest))
}

gulp.task('style',        () => build(config.dir.dist))
gulp.task('style:server', () => build(config.dir.server))
gulp.task('style:watch',  () => build(config.dir.server, true))
