"use strict";

const mandelbrot = require("@frctl/mandelbrot");
const path = require("path");

// create a new instance with custom config options
const subTheme = mandelbrot({
  nav: ["docs", "components"],
  styles: ["default", "/theme/assets/styles/theme.css"],
  panels: ["notes", "html", "context", "resources", "info"],
  scripts: [
    "default",
    "https://unpkg.com/carbon-components/scripts/carbon-components.min.js"
  ],
  static: {
    mount: "fractal"
  }
});

/**
 * Specify a template directory to override any view templates
 */
subTheme.addLoadPath(path.join(__dirname, "views"));

/**
 * Specify the static assets directory that contains the custom stylesheet.
 */
// subTheme.addStatic(__dirname + "/assets");

// subTheme.addRoute("/", {
//   view: "pages/home.nunj"
// });

// subTheme.addRoute("/intro", {
//   handle: "overview",
//   view: "pages/doc.nunj"
// });

/**
 * Export the customised theme instance so it can be used in Fractal projects
 */
module.exports = subTheme;
