const { gulp, src, dest, parallel, series, watch } = require("gulp");
const ts = require('gulp-typescript');
const rename = require('gulp-rename');

const browsersync = require("browser-sync").create();

function browserSync() {
  browsersync.init({
    server: { baseDir: "src/" },
    notify: false,
    online: true,
  });
}

function compile() {
  const tsProject = ts.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(tsProject())
    .pipe(dest('dist'))
    .pipe(dest('src'))
}

function startWatch() {
  watch('src/*.html').on('change', browsersync.reload);
  watch('src/scss/*.scss').on('change', browsersync.reload);
  watch('src/ts/*.ts').on('change', series(compile, browsersync.reload));
}

exports.browsersync = browserSync;

exports.compile = compile;

exports.default = parallel(compile, browserSync, startWatch);