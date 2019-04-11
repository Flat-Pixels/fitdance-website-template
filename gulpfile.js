const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');

/**
 * All path that gulp matter of
 * @type {Object}
 */
const path = {
	main: './src',
	styles: {
		source: './src/assets/styles/**/*.scss',
		dest: './src/assets/styles'
	}
}

/**
 * Compile the Sass files
 */
function styles(){
	return gulp.src(path.styles.source)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(path.styles.dest))
		.pipe(browserSync.stream());
}

/**
 * Init the browserSync
 * @return {[type]} [description]
 */
function syncBrowser(){
	browserSync.init({
		server: {
			baseDir: path.main
		}
	});
}

/**
 * Serve the files in production environement
 * @return {[type]} [description]
 */
function serve(){
	syncBrowser();
	gulp.watch(path.styles.source, styles);
	gulp.watch(path.main + '/**/*.html').on('change', function(){browserSync.reload()})
}

exports.default = serve;
