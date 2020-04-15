const d3 = require('d3');
const topojson = require('topojson');

class Map {
  width = window.innerWidth;
  height = window.innerHeight;

  //Creates a new projection with 'geoMercator' which is the world map
  projection = d3
    .geoMercator()
    .scale(250)
    .center([-30, 0])
    .translate([this.width / 2, (3 * this.height) / 4]);

  // Create geographic path generator
  path = d3.geoPath(this.projection);

  //Creates a default zoom that can be applied to themap with '.call'
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
    this.g.selectAll("circle").attr("r", (d) => this.toSize(d.confirmed));
  }

  // Create D3 SVG Element and append the map to the SVG
  svg = d3
    .select(".visual")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .call(this.zoom);

  // g SVG element is used to group other SVG elements together
  g = this.svg.append("g");
  countries = this.g.append("g").classed("countries", true);
  states = this.g.append("g").classed("states", true);

  //Create map with world and US states topology
  createMapWithTopology = (topology) => {
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
      .style("opacity", 0.8)
      .attr('fill', '#F5F5F5')
  }
}

export default Map;