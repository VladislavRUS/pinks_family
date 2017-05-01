var concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	less = require('gulp-less'),
	gulp = require('gulp'),
	bsync = require('browser-sync');

var jsSource = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
];

var styleSources = [
	'./styles/main.less',
	'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
];

gulp.task('less', function() {
	gulp.src(styleSources)
	.pipe(less())
	.pipe(concat('main.css'))
	.pipe(minifyCSS())
	.pipe(rename({suffix:'.min' }))
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