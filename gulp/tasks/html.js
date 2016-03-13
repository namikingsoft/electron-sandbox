const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (src, dest, isWatch) => {
  const isDist = dest === config.dir.dist
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(isDist, $.useref()))
  .pipe(gulp.dest(dest))
}

gulp.task('html',        () => build(config.src.html, config.dir.dist))
gulp.task('html:server', () => build(config.src.html, config.dir.work.server))
gulp.task('html:server:watch', () => {
  $.watch(config.src.html, config.watch, file => {
    build(file.path, config.dir.work.server, true)
  })
})
