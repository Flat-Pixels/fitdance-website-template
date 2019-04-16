const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
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
	},
	scripts: {
		source: './src/assets/js/**/*.js',
		dest: './src/assets/js'
	},
	dist: './dist'
}

/**
 * Compile the Sass files
 */
function styles(){
	return gulp.src(path.styles.source)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(path.styles.dest))
		.pipe(browserSync.stream());
}

function compileEs6(){
	return gulp.src(path.dist + '/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest(path.dist))
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
	gulp.watch(path.scripts.source).on('change', function(){browserSync.reload()})
	gulp.watch(path.main + '/**/*.html').on('change', function(){browserSync.reload()})
}

function compileAssets(){
	return gulp.src([
		  '**/*.html',
      '**/assets/**/*',
      '!**/assets/js',
      '!**/assets/styles/partials',
      '!**/assets/styles/**/*.scss'
		], { base: './src'})
	.pipe(gulp.dest(path.dist));
}

exports.default = serve;
exports.build = gulp.series(compileAssets, compileEs6);
