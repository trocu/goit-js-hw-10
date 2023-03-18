import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
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
      .then(country => renderCountryList(country))
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }, DEBOUNCE_DELAY)
);

function renderCountryList(country) {
  const markup = country
    .map(country => {
      return `<li class="country-item"><img class="country-img" alt="${country.name}" src="${country.flags.svg}" /><p class="country-text">${country.name.common}</p></li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

// function renderCountryList(country) {
//   const markup = country
//     .map(country => {
//       return `<li class="country-item"><img class="country-img" alt="${country.name}" src="${country.flags.svg}" /><h1 class="country-title">${country.name.common}</h1></li>`;
//     })
//     .join('');

//   countryList.innerHTML = markup;
// }
