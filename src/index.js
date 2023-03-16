import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// https://restcountries.com/v3.1/all
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', () => {
  fetchCountries()
    .then(name => console.log(name))
    .catch(error => console.log(error));
});

function fetchCountries(name) {
  const paramString = `fields=name&fields=capital&fields=population&fields=flags&fields=languages`;
  const searchParams = new URLSearchParams(paramString);
  return fetch(`https://restcountries.com/v3.1/all?${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderCountryList(name) {}

// const fetchData = fetch(`https://restcountries.com/v3.1/all?${searchParams}`);

// fetchData
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     const data = response.json();
//     return data;
//   })
//   .then(data => {
//     console.log('data: ', data);
//     fetchCountries(data);
//   });
