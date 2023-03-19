import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

//Body of the application, listens to the input field and looks for matches in the database
const searchBoxInput = e => {
  const searchParam = e.target.value.trim();
  if (!searchParam) {
    //If user has cleared the input field, we clear the innerHTML properties and abort the query to the database
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  //We fetch the list of countries, if there are more than 10 records abort fetching
  fetchCountries(searchParam)
    .then(country => {
      if (country.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      return printCountries(country);
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
};

searchBox.addEventListener('input', debounce(searchBoxInput, DEBOUNCE_DELAY));

//If there is one match we display as a full description, otherwise as a list of countries
const printCountries = country => {
  if (country.length === 1) {
    return renderCountryInfo(country);
  }
  renderCountryList(country);
};

//View list of countries
const renderCountryList = country => {
  const markup = country
    .map(country => {
      return `
      <li class="country-list_item">
      <img class="country-list_img" alt="${country.name.official}" src="${country.flags.svg}" />
      <p class="country-list_text">${country.name.common}</p>
      </li>`;
    })
    .join('');
  countryInfo.innerHTML = ''; //Clear full description
  countryList.innerHTML = markup;
};

//View country with full description
const renderCountryInfo = country => {
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
  countryList.innerHTML = ''; //Clear country list
  countryInfo.innerHTML = markup;
};
