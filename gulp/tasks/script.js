const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

const build = (dest, isWatch) => {
  return gulp.src(config.src.script)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(isWatch, $.sourcemaps.init()))
  .pipe($.typescript(project))
  .pipe($.if(isWatch, $.sourcemaps.write())) // @todo for tsx
  .pipe($.if(isWatch, $.sourcemaps.init({loadMaps: true}))) // @todo for tsx
  .pipe($.babel())
  .pipe($.if(!isWatch, $.uglify()))
  .pipe($.if(isWatch, $.sourcemaps.write()))
  .pipe(gulp.dest(dest))
}

gulp.task('script',        () => build(config.dir.dist))
gulp.task('script:server', () => build(config.dir.server))
gulp.task('script:watch',  () => {
  // @todo incremental build of typescript is difficult
  build(config.dir.server, true)
  $.watch(config.src.script, config.watch, () => build(config.dir.server, true))
})
