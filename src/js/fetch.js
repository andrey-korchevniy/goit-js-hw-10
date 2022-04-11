import Notiflix from 'notiflix';

function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
// обрабатываемм ошибку 404, она автоматом не обрабатывается
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else Notiflix.Notify.failure('Oops, there is no country with that name');;
    })
}

export default { fetchCountries };