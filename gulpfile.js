var gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

exports.default = function() {
  return gulp.src(
    [
      'src/namespaces.scss',
      'node_modules/sass-unitconverter/_unitconverter.scss',
      'src/unitconverter_override.scss',
      'src/options.scss',
      'src/slope.scss'
    ])
    .pipe(plugins.concat('index.scss'))
    .pipe(gulp.dest('dist/'))
}