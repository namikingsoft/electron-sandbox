const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

gulp.task('script', () => {
  project.src()
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.typescript(project))
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.destDir))
})

gulp.task('script:watch', () => {
  gulp.start('script')
  $.watch(`${config.srcDir}/**/*.{ts,tsx}`, () => gulp.start('script'))
})
