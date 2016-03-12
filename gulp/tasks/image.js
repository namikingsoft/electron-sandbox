const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (dest, isWatch) => {
  return gulp.src(config.src.image)
  .pipe(isWatch? $.watch(config.src.image, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe(gulp.dest(dest))
}

gulp.task('image',              () => build(config.dir.dist))
gulp.task('image:server',       () => build(config.dir.work.server))
gulp.task('image:server:watch', () => build(config.dir.work.server, true))
