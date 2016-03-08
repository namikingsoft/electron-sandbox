const gulp = require('gulp')
const babel = require('gulp-babel')
const typescript = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const config = require('../config').js

const project = typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

gulp.task('js', () => {
  project.src()
  .pipe(sourcemaps.init())
  .pipe(typescript(project))
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.dest))
})

gulp.task('js:watch', () => {
  gulp.start('js')
  gulp.watch(config.src, ['js'])
})
