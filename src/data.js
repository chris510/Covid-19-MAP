const d3 = require('d3');

const topologyCountriesLink = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const topologyStatesLink = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const fetchTopology = Promise.all([
  d3.json(topologyCountriesLink),
  d3.json(topologyStatesLink),
]);

export { 
  fetchTopology 
};