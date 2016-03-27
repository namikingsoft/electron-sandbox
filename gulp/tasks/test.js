const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const runSequence = require('run-sequence')
const config = require('../config')

const workTestFiles = `${config.dir.work.test}/**/*.spec.js`
const checkFileExists = `ls ${workTestFiles}>/dev/null 2>&1`
const envNodePath = `NODE_PATH=${config.dir.work.test}`
const mochaCommand = `${envNodePath} mocha ${workTestFiles}`

gulp.task('test', () => {
  return runSequence(
    'clean:test',
    'script:test',
    'test:shell:mocha',
    'test:shell:tslint'
  )
})

gulp.task('test:watch', () => {
  const build = () => runSequence(
    'clean:test',
    'script:test',
    'test:shell:mocha:min'
  )
  build()
  $.watch([config.src.script, config.src.test], config.watch, build)
})

gulp.task('test:shell:mocha', $.shell.task(`
  if ${checkFileExists}; then
    ${mochaCommand}
  else
    false
  fi
`))

gulp.task('test:shell:mocha:min', $.shell.task(`
  if ${checkFileExists}; then
    ${mochaCommand} --reporter min
  fi
`))

gulp.task('test:shell:tslint', $.shell.task(`
  find src | grep -e '\.tsx\?$' | xargs tslint
`))
