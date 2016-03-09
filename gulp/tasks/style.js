const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const build = isWatch => {
  gulp.src(config.src.style)
  .pipe(isWatch? $.watch(config.src.style, config.watch) : $.util.noop())
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.sourcemaps.init())
  .pipe($.stylus({compress: isWatch? false : true}))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('style',       () => build())
gulp.task('style:watch', () => build(true))
