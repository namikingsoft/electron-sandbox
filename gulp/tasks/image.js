const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = (dist, isWatch) => {
  return gulp.src(config.src.image)
  .pipe(isWatch? $.watch(config.src.image, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('image',        () => build(config.dir.dist))
gulp.task('image:server', () => build(config.dir.server))
gulp.task('image:watch',  () => build(config.dir.server, true))
