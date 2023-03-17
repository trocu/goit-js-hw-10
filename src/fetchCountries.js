// https://restcountries.com/v3.1/all
import { searchBox } from '.';

export const fetchCountries = name => {
  const paramString = `fields=name&fields=capital&fields=population&fields=flags&fields=languages`;
  const searchParams = new URLSearchParams(paramString);
  const url = `https://restcountries.com/v3.1/name/${searchBox.value.trim()}?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
