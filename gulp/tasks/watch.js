const gulp = require('gulp')

gulp.task('watch', () => {
  gulp.start([
    'script:server:watch',
    'style:server:watch',
    'image:server:watch',
    'html:server:watch',
  ])
})
