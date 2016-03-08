const gulp = require('gulp')

gulp.task('watch', () => {
  gulp.start([
    'js:watch',
  ])
})
