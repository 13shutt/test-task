const gulp = require('gulp')
const watch = require('gulp-watch')
const rigger = require('gulp-rigger')
const cssmin = require('gulp-minify-css')
const rimraf = require('rimraf')
const browserSync = require("browser-sync")
const less = require('gulp-less')
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;

gulp.task('hello', hello = callback => {
  console.log('hello')
  callback()
})

const path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
  },
  src: {
    html: 'src/*.html', 
    js: 'src/js/main.js',
    style: 'src/style/main.less', 
  },
  watch: { 
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.less',
  },
  clean: './build'
};

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "shuttov"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
});

gulp.task('build', ['html:build', 'js:build', 'style:build']);

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);