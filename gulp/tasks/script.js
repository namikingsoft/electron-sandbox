const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

gulp.task('script', () => {
  gulp.src(config.src.script)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.typescript(project))
  .pipe($.sourcemaps.write()) // @todo for tsx
  .pipe($.sourcemaps.init({loadMaps: true})) // @todo for tsx
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.dest.dir))
})

gulp.task('script:watch', () => {
  gulp.start('script')
  $.watch(config.src.script, () => gulp.start('script'))
})
