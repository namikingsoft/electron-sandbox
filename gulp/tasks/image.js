const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = isWatch => {
  gulp.src(config.src.image)
  .pipe(isWatch? $.watch(config.src.image, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('image',       () => build())
gulp.task('image:watch', () => build(true))
