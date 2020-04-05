import Map from './map';
import { fetchTopology } from './data';

const css = require('./app.scss');
const map = new Map();

fetchTopology.then(([topologyCountries, topologyStates] )=> {
  map.createMapWithTopology(topologyCountries);
  map.createMapWithTopology(topologyStates);
})
