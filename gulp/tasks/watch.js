const gulp = require('gulp')

gulp.task('watch', () => {
  gulp.start([
    'script:watch',
    'style:watch',
    'image:watch',
    'html:watch',
  ])
})
