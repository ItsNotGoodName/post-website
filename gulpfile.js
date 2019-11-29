const gulp = require("gulp");
const browserSync = require("browser-sync");
const nodemon = require("gulp-nodemon");
require('dotenv').config()
//https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#gistcomment-2795936
gulp.task("nodemon", cb => {
  let started = false;

  return nodemon({
    script: "app.js"
  }).on("start", () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task(
  "browser-sync",
  gulp.series("nodemon", () => {
    browserSync.init(null, {
      proxy: "127.0.0.1:" + process.env.PORT || 8080,
      files: ["src/views/**/*.ejs"],
      port: 3000
    });
  })
);

gulp.task("default", gulp.series("browser-sync", () => {}));
