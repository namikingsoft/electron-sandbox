const gulp = require('gulp')

gulp.task('build', () => {
  gulp.start([
    'script',
    'style',
    'image',
    'html',
  ])
})
