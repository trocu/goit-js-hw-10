import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', () => {
  fetchCountries('poland')
    .then(name => console.log(name))
    .catch(error => console.log(error));
});

function renderCountryList(name) {}
