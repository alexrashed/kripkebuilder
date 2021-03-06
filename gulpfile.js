var gulp = require('gulp'),
    connect = require('gulp-connect'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject');

var bowerFiles = mainBowerFiles({
  overrides: {
    bootstrap: {
      main: [
        './dist/js/bootstrap.js',
        './dist/css/*.min.*',
        './dist/fonts/*.*'
      ]
    },
    "font-awesome": {
      main: [
        './css/font-awesome.css',
        './fonts/fontawesome-webfont.woff2',
        './fonts/fontawesome-webfont.woff',
        './fonts/fontawesome-webfont.ttf',
      ]
    }
  }
});

gulp.task('js', function() {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('build'));
});
gulp.task('css', function() {
  return gulp.src('src/*.css')
    .pipe(gulp.dest('build'));
});
gulp.task('bower', function() {
  return gulp.src(bowerFiles, {base: 'bower_components'})
    .pipe(gulp.dest('build/lib'));
});

gulp.task('inject', ['bower', 'js', 'css'], function() {
  return gulp.src('src/*.html')
    .pipe(inject(gulp.src(bowerFiles, {read: false}), {ignorePath: 'bower_components', addPrefix: 'lib', addRootSlash: false, name: 'bower'}))
    .pipe(inject(gulp.src('src/*.js', {read: false}), {ignorePath: 'src', addRootSlash: false}))
    .pipe(inject(gulp.src('src/*.css', {read: false}), {ignorePath: 'src', addRootSlash: false}))
    .pipe(gulp.dest('build'));
});

gulp.task('connect', ['inject'], function() {
  connect.server({root: 'build'});
});

gulp.task('default', ['inject']);
