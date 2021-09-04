const gulp = require('gulp')
const plumber = require('gulp-plumber')
const svgSprite = require('gulp-svg-sprite')
const svgo = require('gulp-svgo')
const rename = require('gulp-rename')

const config = {
  mode: {
    symbol: true
  }
}

gulp.task('icons', () =>
  gulp
    .src('src/assets/icons/*.svg', { cwd: '' })
    .pipe(plumber())
    .pipe(svgo())
    .pipe(svgSprite(config))
    .on('error', err => {
      console.log('on error', err)
    })
    .pipe(
      rename(_ => ({
        dirname: 'src/assets/icons/gen',
        basename: 'index',
        extname: '.svg'
      }))
    )
    .pipe(gulp.dest('./'))
)

gulp.task('default', gulp.series('icons'))
