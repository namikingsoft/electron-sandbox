const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (src, dest, isWatch) => {
  const isDevelop = dest !== config.dir.dist
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(isDevelop, $.sourcemaps.init()))
  .pipe($.stylus())
  .pipe($.concat('styles/index.css'))
  .pipe($.if(!isDevelop, $.cssmin()))
  .pipe($.if(isDevelop, $.sourcemaps.write()))
  .pipe(gulp.dest(dest))
}

gulp.task('style',        () => build(config.src.style, config.dir.dist))
gulp.task('style:server', () => build(config.src.style, config.dir.work.server))
gulp.task('style:server:watch', () => {
  $.watch(config.src.styleWatch, config.watch, file => {
    build(config.src.style, config.dir.work.server, true)
  })
})
