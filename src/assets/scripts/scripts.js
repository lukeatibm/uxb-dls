/* global document, window */
import "babel-polyfill";

import createContactCards from "../../development/components/contact-card/contact-card";
import createBubbleChart from "../../development/components/bubble-chart/bubble-chart";
import createNavbars from "../../development/components/navbar/navbar";

document.addEventListener("DOMContentLoaded", () => {
  createContactCards();
  createBubbleChart();
  createNavbars();
});
