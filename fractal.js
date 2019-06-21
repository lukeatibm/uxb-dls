/*
 * Configure a Fractal instance.
 */
const theme = require("./src/theme");
const fractal = require("@frctl/fractal").create();

const paths = {
  src: `${__dirname}/src`,
  tmp: `${__dirname}/tmp`,
  dist: `${__dirname}/dist`
};

const nunjucks = require("@frctl/nunjucks")({
  filters: {
    slugify(str) {
      return str.toLowerCase().replace(/[^\w]+/g, "");
    },
    stringify(str) {
      return JSON.stringify(str, null, "\t");
    }
  }
});
const statuses = {
  done: {
    label: "Done",
    description: "Has been implemented.",
    class: "bx--tag--blue"
  },
  inprogress: {
    label: "In progress",
    description: "Currently being implemented",
    class: "bx--tag--magenta"
  },
  ready: {
    label: "Ready",
    description: "Ready to implement.",
    class: "bx--tag--green"
  },
  qa: {
    label: "QA",
    description: "Requires QA",
    class: "bx--tag--teal"
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution.",
    class: "bx--tag--purple"
  },
  prototype: {
    label: "Prototype",
    description: "Do not implement.",
    class: "bx--tag--red"
  },
  backlog: {
    label: "Backlog",
    description: "Requires further action.",
    class: "bx--tag--warm-gray"
  },
  archived: {
    label: "Archived",
    description: "Old version. Do not implement.",
    class: "bx--tag--cool-gray"
  }
};

fractal.set("project.title", "UXB Design Language System");
fractal.components.engine(nunjucks);
fractal.components.set("path", `${paths.src}/development`);
fractal.components.set("default.status", "backlog");
fractal.components.set("default.preview", "@preview");
fractal.components.set("ext", ".nunj");
fractal.components.set("label", "Development");
fractal.components.set("statuses", statuses);

fractal.docs.engine(nunjucks);
fractal.docs.set("ext", ".md");
fractal.docs.set("default.status", "wip");
fractal.docs.set("path", `${paths.src}/docs`);
fractal.docs.set("label", "Documentation");
fractal.docs.set("statuses", statuses);

fractal.web.theme(theme);
fractal.web.set("server.port", 8000);
fractal.web.set("static.path", paths.tmp);
fractal.web.set("builder.dest", paths.dist);

module.exports = { fractal, paths };
