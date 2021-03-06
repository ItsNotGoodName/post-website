const gulp = require("gulp");
const browserSync = require("browser-sync");
const nodemon = require("gulp-nodemon");
require('dotenv').config()
//https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#gistcomment-2795936
gulp.task("nodemon", cb => {
  let started = false;
  process.env.NODE_ENV = "development";
  return nodemon({
    script: "app.js",
    legacyWatch: true
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
      proxy: "http://localhost:" + (typeof process.env.PORT == 'undefined' ? 8080 : process.env.PORT),
      files: ["src/views/**/*.ejs", "src/public/**/*"],
      notify: false,
      open: false
    });
  })
);

gulp.task("default", gulp.series("browser-sync", () => {}));