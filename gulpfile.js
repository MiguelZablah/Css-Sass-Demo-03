// Requiered
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	stripCssComments = require('gulp-strip-css-comments'),
	browserSync = require('browser-sync').create();

// Route Variables
var sassSrc = 'sass/**/*.scss';
var htmlDir = 'app/*.html';
var sassDir = 'app/css/';

// Task Sass compiler
gulp.task('sass', function() {
	return gulp
		.src(sassSrc)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(stripCssComments())
		.pipe(cleanCSS({ compatibility: 'ie9' }))
		.pipe(gulp.dest(sassDir))
		.pipe(browserSync.stream());
});

// Start server with sass wacher and html watcher
gulp.task('serve', function() {
	browserSync.init({
		server: './app'
	});

	gulp.watch(sassSrc, gulp.parallel('sass'));
	gulp.watch(htmlDir).on('change', browserSync.reload);
});

// Compile my sass files to css
gulp.task('default', gulp.series('sass', done => done()));
