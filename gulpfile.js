"use strict";

const gulp = require("gulp");
const { fractal, paths } = require("./fractal");
const sass = require("gulp-sass");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const logger = fractal.cli.console;

// Create Fractal Dist
function fractalBuild() {
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success("Fractal build complete");
  });
}

// Serve fractal for development
function fractalServe() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`System is now running at ${server.url}`);
    logger.success(`Network URL: ${server.urls.sync.external}`);
  });
}

// DLS  Theme Styles
function DLSThemeStyles(options = {}) {
  return function DLSThemeStyles() {
    return gulp
      .src(`${paths.src}/theme/assets/theme.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass(options).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: ["last 50 versions", "ie >= 10"],
          cascade: false
        })
      )
      .pipe(sourcemaps.write("./")) // Output source maps.
      .pipe(gulp.dest(`${paths.tmp}/theme/assets/styles`));
  };
}

function BuildStyles(options = {}) {
  return function BuildStyles() {
    return gulp
      .src(`${paths.src}/assets/scss/styles.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass(options).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: ["last 50 versions", "ie >= 10"],
          cascade: false
        })
      )
      .pipe(sourcemaps.write("./")) // Output source maps.
      .pipe(gulp.dest(`${paths.tmp}/assets/styles`));
  };
}

// Scripts
function BuildScripts() {
  return function BuildScripts() {
    return browserify({
      entries: `${paths.src}/assets/scripts/scripts.js`,
      debug: true
    })
      .transform("babelify", {
        global: true,
        presets: ["@babel/preset-env"]
      })
      .bundle()
      .pipe(source("scripts.js"))
      .pipe(buffer())
      .pipe(gulp.dest(`${paths.tmp}/assets/scripts`));
  };
}

function moveIBMCloudFiles() {
  return gulp.src("./ibm_cloud/*").pipe(gulp.dest(`${paths.dist}/`));
}
// Clean temp and dist folders
function clean() {
  return del([`${paths.dist}`, `${paths.tmp}`]);
}

function watchFiles() {
  gulp.watch(`${paths.src}/theme/assets/**/*.scss`, DLSThemeStyles());

  gulp.watch(`${paths.src}/development/**/*.scss`, BuildStyles());

  gulp.watch(`${paths.src}/development/**/*.js`, BuildScripts());
}

const sassOptions = {
  outputStyle: "compressed"
};

const development = gulp.parallel(
  DLSThemeStyles(),
  BuildStyles(),
  BuildScripts()
);
const production = gulp.parallel(
  DLSThemeStyles(sassOptions),
  BuildStyles(sassOptions),
  BuildScripts()
);

// Development Task
gulp.task("develop", gulp.series(clean, development, fractalServe, watchFiles));

// Build Task
gulp.task(
  "build",
  gulp.series(clean, production, fractalBuild, moveIBMCloudFiles)
);
