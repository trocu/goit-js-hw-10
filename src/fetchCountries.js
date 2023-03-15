// https://restcountries.com/v3.1/all

const fetchData = fetch('https://restcountries.com/v3.1/all?fields=name');

fetchData
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = response.json();
    return data;
  })
  .then(data => {
    console.log('data: ', data);
  });
