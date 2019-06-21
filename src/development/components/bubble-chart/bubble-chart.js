/* global document */
import * as d3 from "d3";

class BubbleChart {
  constructor(bubbleChart) {
    this.bubbleChart = bubbleChart;
  }

  init() {
    const width = 1024;
    const height = 775;
    const primaryColor = d3.rgb("#0B1952");
    const coreColor = d3.rgb("#FF7E40");
    const bubbles = JSON.parse(this.bubbleChart.dataset.bubbles);

    if (!bubbles) {
      return;
    }

    const bubble = d3
      .pack(bubbles)
      .size([width, height])
      .padding(16);

    const svg = d3
      .select(this.bubbleChart)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("class", "bubble");

    const nodes = d3.hierarchy(bubbles).sum(function(d) {
      return d.Count;
    });

    const node = svg
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d) {
        return !d.children;
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .append("g")
      .attr("class", "graph");

    node.append("title").text(function(d) {
      return d.Name + ": " + d.Count;
    });

    node
      .append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d, i) {
        if (d.data.Core) {
          return coreColor;
        } else {
          return primaryColor;
        }
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "'Poppins', sans-serif")
      .attr("font-size", function(d) {
        return d.r / 6;
      })
      .attr("fill", "white");

    // d3.select(self.frameElement).style("height", height + "px");
  }
}

function bubbleChartInit() {
  const bubbleCharts = document.querySelectorAll(".js-bubble-chart");
  if (bubbleCharts.length === 0) {
    return null;
  }
  for (let i = 0; i < bubbleCharts.length; i += 1) {
    const bubbleChart = new BubbleChart(bubbleCharts[i]);
    bubbleChart.init();
  }
  return null;
}

export default bubbleChartInit;
