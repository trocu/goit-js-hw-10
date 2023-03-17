import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
export const searchBox = document.querySelector('#search-box');

searchBox.addEventListener(
  'input',
  debounce(() => {
    fetchCountries()
      .then(name => console.log(name))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

// function renderCountryList(name) {}
