const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

const project = $.typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
})

const build = (src, dest, isWatch) => {
  const isDevelop = dest !== config.dir.dist
  return gulp.src(src)
  .pipe($.if(isWatch, $.plumber()))
  .pipe($.if(isDevelop, $.sourcemaps.init()))
  .pipe($.typescript(project))
  .pipe($.if(isDevelop, $.sourcemaps.write())) // @todo for tsx
  .pipe($.if(isDevelop, $.sourcemaps.init({loadMaps: true}))) // @todo for tsx
  .pipe($.babel())
  .pipe($.if(!isDevelop, $.uglify()))
  .pipe($.if(isDevelop, $.sourcemaps.write()))
  .pipe(gulp.dest(dest))
}

gulp.task('script',        () => build(config.src.script, config.dir.dist))
gulp.task('script:server', () => build(config.src.script, config.dir.work.server))
gulp.task('script:server:watch',  () => {
  $.watch(config.src.script, config.watch, file => {
    // @todo incremental build of typescript is difficult
    build(config.src.script, config.dir.work.server, true)
  })
})

gulp.task('script:test', () => {
  return build([config.src.script, config.src.test], config.dir.work.test)
})
gulp.task('script:test:watch', () => {
  $.watch([config.src.script, config.src.test], config.watch, () => {
    // @todo incremental build of typescript is difficult
    build([config.src.script, config.src.test], config.dir.work.test, true)
  })
})
