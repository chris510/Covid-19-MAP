const d3 = require('d3');
const topojson = require('topojson');

class Map {
  width = window.innerWidth;
  height = window.innerHeight;

  projection = d3
    .geoMercator()
    .scale(250)
    .center([-30, 0])
    .translate([this.width / 2, (3 * this.height) / 4]);

  path = d3.geoPath(this.projection);

  zoom = d3
    .zoom()
    .scaleExtent([0.25, 100])
    .translateExtent([
      [-500, -100],
      [1800, 1000],
    ])
    .on("zoom", this.zoomed.bind(this));

  zoomed() {
    this.g
      // .selectAll('path') // To prevent stroke width from scaling
      .attr("transform", d3.event.transform);
    this.setScaling(d3.event.transform.k);
    this.g.selectAll("circle").attr("r", (d) => this.toSize(d.confirmed));
  }

  svg = d3
    .select(".visual")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .call(this.zoom);

  g = this.svg.append("g");

  countries = this.g.append("g").classed("countries", true);
  states = this.g.append("g").classed("states", true);

  createMapWithTopology(topology) {
    let geojson;
    let object;

    if (topology.objects.states) {
      geojson = topojson.feature(topology, topology.objects.states);
      object = this.states;
    } else {
      geojson = topojson.feature(topology, topology.objects.countries);
      object = this.countries;
    }
    const pathObj = object.selectAll("path").data(geojson.features);
    pathObj
      .enter()  
      .append("path")
      .attr("d", this.path)
      .style("opacity", 0)
      .transition()
      .ease(d3.easeCubicIn)
      .duration(1000)
      .style("opacity", 1);
  }
}

export default Map;