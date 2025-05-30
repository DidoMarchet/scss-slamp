var gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

exports.default = function() {
  return gulp.src(
    [
      'src/namespaces.scss',
      'src/unitconverter_override.scss',
      'src/utils.scss',
      'src/options.scss',
      'src/slope.scss'
    ])
    .pipe(plugins.concat('index.scss'))
    .pipe(gulp.dest('dist/'))
}