const gulp = require('gulp')

gulp.task('watch', () => {
  gulp.start([
    'script:watch',
    'style:watch',
    'html:watch',
  ])
})
