import './app.scss';
import Map from './map';
import { fetchTopology } from './data';

const css = require('./app.scss');
console.log('hello!!!')
console.log('hello2321321')

const map = new Map();

fetchTopology.then(([topologyCountries, topologyStates] )=> {
  map.createMapWithTopology(topologyCountries);
  map.createMapWithTopology(topologyStates);
})
