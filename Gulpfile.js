var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  lr = require('tiny-lr'),
  server = lr();

gulp.task('styles', function() {
  return gulp.src('sass/*.scss')
  .pipe(sass({ style: 'expanded' }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('default', ['styles']);
