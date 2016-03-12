const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (src, dest, isWatch) => {
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe(gulp.dest(dest))
}

gulp.task('image',        () => build(config.src.image, config.dir.dist))
gulp.task('image:server', () => build(config.src.image, config.dir.work.server))
gulp.task('image:server:watch', () => {
  $.watch(config.src.image, config.watch, file => {
    build(file.path, config.dir.work.server, true)
  })
})
