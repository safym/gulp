const { gulp, src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();

function C() {
  browserSync.init({
    server: { baseDir: "src/" },
    files: ["src/*.html", "src/scss/*.scss", "src/ts/*.js"],
    notify: false,
    online: true,
  });
}

exports.browsersync = browsersync;
