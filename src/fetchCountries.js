export const fetchCountries = name => {
  const paramString = '?fields=name,capital,population,flags,languages';
  const URL = 'https://restcountries.com/v3.1/name/';
  return fetch(`${URL}${name}${paramString}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
