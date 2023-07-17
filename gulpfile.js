const { gulp, src, dest, parallel, series, watch } = require("gulp");

const browsersync = require("browser-sync").create();

function browserSync() {
  browsersync.init({
    server: { baseDir: "src/" },
    notify: false,
    online: true,
  });
}

function startWatch() {
  watch('src/*.html').on('change', browsersync.reload);
  watch('src/scss/*.scss').on('change', browsersync.reload);
  watch('src/ts/*.ts').on('change', browsersync.reload);
}

exports.browsersync = browserSync;

exports.default = parallel(browserSync, startWatch);