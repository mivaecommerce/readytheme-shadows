const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoPrefix = require('autoprefixer');
const cssVariables = require('postcss-css-variables');
const calc = require('postcss-calc');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-terser');
const discardComments = require('postcss-discard-comments');
const sourceMap = require('gulp-sourcemaps');
const nano = require('cssnano');

// Default paths
const buildPathCore = 'build/core';
const buildPathExtensions = 'build/extensions';
const buildPathUI = 'build/ui';
const outputPath = 'deploy'; // This is the folder for final CSS and JavaScript files

// SCSS Options
const sassOptions = {
	outputStyle: 'expanded',
	indentType: 'tab',
	indentWidth: 1,
	precision: 2,
	sourceComments: true
};

// JavaScript file paths
const coreJsPath = buildPathCore + '/js';
const uiJsPath = buildPathUI + '/js';

/**
 * This task will process the SCSS files and generate a stylesheet.
 */
gulp.task('styles', function () {
	return gulp.src([
		buildPathCore + '/css/core.scss',
		buildPathExtensions + '/extensions.scss',
		buildPathUI + '/css/theme.scss'
	])
		.pipe(sourceMap.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(postcss([
			autoPrefix()
		]))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(outputPath + '/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(postcss([
			nano({
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(sourceMap.write('./'))
		.pipe(gulp.dest(outputPath + '/css'))

});

/**
 * This task will generate a separate stylesheet for legacy browsers.
 */
gulp.task('fallbackStyles', function () {
	return gulp.src(outputPath + '/css/styles.css')
		.pipe(sourceMap.init())
		.pipe(postcss([
			cssVariables(),
			calc(),
			discardComments()
		]))
		.pipe(rename('styles-fallback.css.min'))
		.pipe(postcss([
			nano({
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(sourceMap.write('./'))
		.pipe(gulp.dest(outputPath + '/css'))
});

/**
 * This task will compile the JavaScript files and, if uncommented, create a minified version with a `map` file.
 */
gulp.task('scripts', function () {
	return gulp.src([
		coreJsPath + '/jquery.min.js',
		coreJsPath + '/utilities.js',
		buildPathExtensions + '/breadcrumbs/collapsing-breadcrumbs/collapsing-breadcrumbs.js',
		buildPathExtensions + '/dialog/dialog.js',
		buildPathExtensions + '/fasten-header/fasten-header.js',
		buildPathExtensions + '/messages/messages.js',
		buildPathExtensions + '/mini-basket/mini-basket.js',
		buildPathExtensions + '/navigation/transfigure-navigation.js',
		buildPathExtensions + '/quantify/quantify.js',
		buildPathExtensions + '/payment/payment-method.js',
		buildPathExtensions + '/product-layout/ajax-add-to-cart.js',
		buildPathExtensions + '/show-password/show-password.js',
		buildPathExtensions + '/show-related/a11y-toggle.js',
		buildPathExtensions + '/tabs/a11y-tabs.js',
		uiJsPath + '/theme.js'
	])
		.pipe(sourceMap.init())
		.pipe(concat('scripts.js'))
		/**
		 * If you would like to have an un-minified version of the JavaScript build,
		 * uncomment the following line.
		 */
		//.pipe(gulp.dest(outputPath + '/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(sourceMap.write('./'))
		.pipe(gulp.dest(outputPath + '/js'))


});

/**
 * This task will run the preceding tasks.
 */
gulp.task('build', gulp.series([
	'styles',
	'fallbackStyles',
	'scripts'
]));

/**
 * This task will watch for changes in the SCSS or JavaScript files and process the tasks as needed.
 */
gulp.task('watch', gulp.series([
	'styles',
	'fallbackStyles',
	'scripts'
], function () {
	gulp.watch('build/**/*.scss', gulp.series(['styles', 'fallbackStyles']));
	gulp.watch('build/**/*.js', gulp.series(['scripts']));
}));
