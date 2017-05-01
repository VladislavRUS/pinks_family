var concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	less = require('gulp-less'),
	gulp = require('gulp'),
	bsync = require('browser-sync');

gulp.task('less', function() {
	gulp.src('./styles/main.less')
	.pipe(less())
	.pipe(concat('main.css'))
	.pipe(minifyCSS())
	.pipe(rename({suffix:'.min' }))
	.pipe(gulp.dest('./styles/'))
	.pipe(bsync.stream());
});

gulp.task('serve', function() {
	bsync.init({
		server: './'
	});

	gulp.watch('./styles/blocks/**/*.less', ['less']);
})