import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './js/fetch';
import getRefs from './js/refs.js';
import countryCard from './templates/card.hbs';
import countryList from './templates/list.hbs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
let markup = '';
let inputCountry = '';

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
    // получаем данные со строки ввода
    inputCountry = (event.target.value).trim();
    // проверяем, не пустые ли данные - пресекаем ошибочный пустой запрос
    if (inputCountry === '') { return };
    // очищаем страницу, если там что было
    clearField();
    // отправляем запрос и рисуем 
    API.fetchCountries(inputCountry)
        .then(renderData)
        .catch(err => console.log(err))
}

// рисует то, что зависит от результата запроса (нотификация, карочка или список)
function renderData(data) {
    console.log(data);
    if (data.length > 10) {
        reportOverMax();
    }
    else if (data.length === 1) {
        renderCard(data);
    }
    else {
        renderList(data);
    }
}

// очистка ранее нарисованного
function clearField() {
    markup = '';
    refs.info.innerHTML = markup;
    refs.list.innerHTML = markup;
}

// нотификация о большом количестве стран
function reportOverMax() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

// рисуем карточку страны
function renderCard(data) {
    let country = data[0];
    country.languages = country.languages.map(lang => lang.name).join(', ');
    markup = countryCard(country);
    refs.info.innerHTML = markup;
}

// рисуем список стран 
function renderList(data) {
    const markupArray = data.map(element => countryList(element));
    markupArray.forEach(element => markup += element);
    refs.list.insertAdjacentHTML('afterbegin', markup);
}

// корректировка нотификатора (переместил на середину с правого края)
Notiflix.Notify.init( {
    width: '280px',
    position: 'center-top',
})
