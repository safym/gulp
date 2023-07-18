const { src, dest, parallel, series, watch } = require("gulp");
const clean = require("gulp-clean");
const changed = require("gulp-changed");
const sass = require("gulp-sass")(require("sass"));
const ts = require("gulp-typescript");

const browsersync = require("browser-sync").create();

function browserSync() {
  browsersync.init({
    server: { baseDir: "dist/" },
    notify: false,
    online: true,
  });
}

function copyAssets() {
  return src("src/assets/**/*")
    .pipe(changed("dist"))
    .pipe(dest("dist/assets/"))
    .pipe(browsersync.stream());
}

function compileSCSS() {
  return src("src/**/*.scss")
    .pipe(sass())
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}

function compileTS() {
  return src("src/**/*.ts")
    .pipe(ts())
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}

function copyHTML() {
  return src("src/*.html").pipe(dest("dist")).pipe(browsersync.stream());
}

function startWatch() {
  watch("src/assets/**/*", copyAssets);
  watch("src/*.html", copyHTML);
  watch("src/**/*.scss", compileSCSS);
  watch("src/**/*.ts", compileTS);
}

function cleanDist() {
  return src("dist", { allowEmpty: true }).pipe(clean());
}

exports.browsersync = browserSync;

exports.copyHTML = copyHTML;
exports.compileSCSS = compileSCSS;
exports.compileTS = compileTS;

exports.default = series(
  cleanDist,
  parallel(
    copyAssets,
    copyHTML,
    compileSCSS,
    compileTS,
    browserSync,
    startWatch
  )
);
