const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (src, dest, isWatch) => {
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.sourcemaps.init())
  .pipe($.stylus({compress: isWatch? false : true}))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(dest))
}

gulp.task('style',        () => build(config.src.style, config.dir.dist))
gulp.task('style:server', () => build(config.src.style, config.dir.work.server))
gulp.task('style:server:watch', () => {
  $.watch(config.src.style, config.watch, file => {
    build(file.path, config.dir.work.server, true)
  })
})
