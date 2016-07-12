// *** include gulp
var gulp = require('gulp'); 


// *** include plug-ins
var jshint = require('gulp-jshint');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

var minifyHTML = require('gulp-minify-html');

var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var gutil = require('gulp-util');
gutil.log('Console CLI');

// *** excluded files path
var cssIE = './css/ie.css';
var respondJS = './js/respond.js';



// *** gulp tasks

// JS hint task
gulp.task('jshint', function() {
  gulp.src('.build/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});



// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./js/playground.js','./js/*.js', '!'+respondJS ])
    .pipe(concat('script.js'))
    //.pipe(stripDebug()) 
    //.pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});



// minify new or changed HTML pages
// gulp.task('htmlpage', function() {
//   var htmlSrc = './src/*.html',
//       htmlDst = './build';

//   gulp.src(htmlSrc)
//     .pipe(changed(htmlDst))
//     .pipe(minifyHTML())
//     .pipe(gulp.dest(htmlDst));
// });


// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./_site/css/main.js', './css/*.css', '!'+cssIE ])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', ['jshint', 'imagemin', 'scripts', 'styles'], function() {
  // watch for HTML changes
  // gulp.watch('./src/*.html', function() {
  //   gulp.run('htmlpage');
  // });

  // watch for JS changes
  gulp.watch('./scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./css/*.css', function() {
    gulp.run('styles');
  });
});