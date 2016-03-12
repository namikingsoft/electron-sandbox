const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

const build = (dest, isWatch) => {
  return gulp.src([config.src.script, config.src.test])
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.sourcemaps.init())
  .pipe($.typescript(project))
  .pipe($.sourcemaps.write()) // @todo for tsx
  .pipe($.sourcemaps.init({loadMaps: true})) // @todo for tsx
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(dest))
}

gulp.task('test', () => build(config.dir.work.test))
gulp.task('test:watch',  () => {
  $.watch([config.src.script, config.src.test], config.watch, () => build(config.dir.work.test, true))
})
