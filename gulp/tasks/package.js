const gulp = require('gulp')

gulp.task('package', () => {
  gulp.start([
    'script',
    'style',
    'image',
    'html',
  ])
})
