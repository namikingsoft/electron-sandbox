const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (src, dest, isWatch) => {
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe(gulp.dest(dest))
}

gulp.task('asset',        () => build(config.src.asset, config.dir.dist))
gulp.task('asset:server', () => build(config.src.asset, config.dir.work.server))
gulp.task('asset:server:watch', () => {
  $.watch(config.src.asset, config.watch, file => {
    build(file.path, config.dir.work.server, true)
  })
})
