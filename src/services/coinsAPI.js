export const getCoins = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((s) => s.json())
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
);

export default getCoins;
