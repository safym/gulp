const { src, dest, parallel, series, watch } = require("gulp");

const clean = require("gulp-clean");
const autoprefixer = require("gulp-autoprefixer");
const changed = require("gulp-changed");
const sass = require("gulp-sass")(require("sass"));
const ts = require("gulp-typescript");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");

const browsersync = require("browser-sync").create();

// Browsersync init
function browserSync() {
  browsersync.init({
    server: { baseDir: "dist/" },
    notify: false,
    online: true,
  });
}

// Develop
// Copy assets for develop
function copyAssets() {
  return src("src/assets/**/*")
    .pipe(changed("dist"))
    .pipe(dest("dist/assets/"))
    .pipe(browsersync.stream());
}

// Compile scss for develop
function compileSCSS() {
  return src("src/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}

// Compile TS for develop
function compileTS() {
  return src("src/**/*.ts")
    .pipe(ts())
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}

// Copy HTML for develop
function copyHTML() {
  return src("src/*.html").pipe(dest("dist")).pipe(browsersync.stream());
}

// Start watch files for develop
function startWatch() {
  watch("src/assets/**/*", copyAssets);
  watch("src/*.html", copyHTML);
  watch("src/**/*.scss", compileSCSS);
  watch("src/**/*.ts", compileTS);
}

// Clean directory for develop
function cleanDist() {
  return src("dist", { allowEmpty: true }).pipe(clean());
}

// Build
// Optimize assets for build
function optimizeBuildAssets() {
  return src("src/assets/**/*").pipe(imagemin()).pipe(dest("build/assets/"));
}

// Compile scss for build
function compileBuildSCSS() {
  return src("src/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("build/"));
}

// Compile TS for build
function compileBuildTS() {
  return src("src/**/*.ts").pipe(ts()).pipe(uglify()).pipe(dest("build/"));
}

// Copy HTML for build
function copyBuildHTML() {
  return src("src/*.html").pipe(dest("build"));
}

// Clean directory for build
function cleanBuild() {
  return src("build", { allowEmpty: true }).pipe(clean());
}

exports.browsersync = browserSync;

exports.copyHTML = copyHTML;
exports.compileSCSS = compileSCSS;
exports.compileTS = compileTS;

exports.build = series(
  cleanBuild,
  parallel(optimizeBuildAssets, copyBuildHTML, compileBuildSCSS, compileBuildTS)
);

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
