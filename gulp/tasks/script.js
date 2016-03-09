const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

const build = isWatch => {
  gulp.src(config.src.script)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(isWatch, $.sourcemaps.init()))
  .pipe($.if(isWatch, $.sourcemaps.write())) // @todo for tsx
  .pipe($.if(isWatch, $.sourcemaps.init({loadMaps: true}))) // @todo for tsx
  .pipe($.babel())
  .pipe($.if(!isWatch, $.uglify()))
  .pipe($.if(isWatch, $.sourcemaps.write()))
  .pipe(gulp.dest(isWatch? config.dir.server : config.dir.dist))
}

gulp.task('script',       () => build())
gulp.task('script:watch', () => {
  // @todo incremental build of typescript is difficult
  gulp.start('script')
  $.watch(config.src.script, config.watch, () => build(true))
})
