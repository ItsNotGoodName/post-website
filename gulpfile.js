const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon')
require('dotenv').config()

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "127.0.0.1:" + process.env.HTTPPORT || 8080
    });
});

gulp.task('start', function (done) {
  nodemon({
    script: 'app.js'
  , ext: 'js ejs env'
  , done: done
  })
})

gulp.task('default', gulp.parallel('browser-sync', 'start'));