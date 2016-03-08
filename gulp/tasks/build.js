const gulp = require('gulp')

gulp.task('build', () => {
  gulp.start([
    'script',
    'style',
    'html',
  ])
})
