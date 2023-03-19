import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
export const searchBox = document.querySelector('#search-box');

const searchInput = e => {
  console.log(typeof e.target.value);
  if (!e.target.value) {
    console.log('brak tekstu');
  }

  fetchCountries()
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      return country;
    })
    .then(country => {
      if (country.length === 1) {
        return renderCountryInfo(country);
      }
      return renderCountryList(country);
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
};

function renderCountryList(country) {
  const markup = country
    .map(country => {
      return `
      <li class="country-list_item">
      <img class="country-list_img" alt="${country.name.official}" src="${country.flags.svg}" />
      <p class="country-list_text">${country.name.common}</p>
      </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderCountryInfo(country) {
  const markup = country.map(country => {
    return `
    <img class="country-info_img" alt="${country.name.official}" src="${
      country.flags.svg
    }" />
    <h1 class="country-info_title">${country.name.official}</h1>
    <p class="country-info_text"><b>Capital:</b> ${country.capital}</p>
    <p class="country-info_text"><b>Population:</b> ${country.population}</p>
    <p class="country-info_text"><b>Languages:</b> ${Object.values(
      country.languages
    )}</p>`;
  });

  countryInfo.innerHTML = markup;
}

searchBox.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));
