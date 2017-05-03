var concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	less = require('gulp-less'),
	gulp = require('gulp'),
	bsync = require('browser-sync');

var jsSource = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

var styleSources = [
	'node_modules/bootstrap/dist/css/bootstrap.min.css',
	'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
	'./styles/main.less'
];

gulp.task('less', function() {
	gulp.src(styleSources)
	.pipe(less())
	.pipe(concat('main.css'))
	.pipe(gulp.dest('./styles/'))
	.pipe(bsync.stream());
});

gulp.task('js', function() {
	gulp.src(jsSource)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./scripts'));
});

gulp.task('serve', function() {
	bsync.init({
		server: './'
	});

	gulp.watch('./styles/**/**/*.less', ['less']);
	gulp.watch('./styles/main.less', ['less']);
	gulp.watch('./*.html', bsync.reload);
});