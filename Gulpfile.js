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

var wiredep = require('wiredep').stream;

gulp.task('styles', function() {
  return gulp.src('app/sass/*.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('css'))
	.pipe(notify({ message: 'Styles task complete' }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('app/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('/'));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('img/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['css/**','js/**','img/**','*.html']).on('change', function(file) {
	server.changed(file.path);
  });

});

gulp.task('production', function() {
  connect.server({
    root: './app',
    port: process.env.PORT,
  });
});

//gulp.task('default', ['webserver', 'inject-styles', 'inject-scripts', 'styles', 'scripts', 'watch']);
gulp.task('default', ['styles', 'scripts']);
