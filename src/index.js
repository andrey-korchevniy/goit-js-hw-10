import refs from './js/refs.js';
import './css/styles.css';
import debounce from 'lodash.debounce';
import FetchCoutriesList from './js/fetch';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

console.log(refs);
// console.log(refs.info);

const newFetchCountries = new FetchCoutriesList();

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
    newFetchCountries.query = (event.target.value).trim();
    newFetchCountries.fetchCountries();
}

    // name.official - полное имя страны
    // capital - столица
    // population - население
    // flags.svg - ссылка на изображение флага
    // languages - массив языков


// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, 
// а разметка списка стран или информации о стране пропадает.

// Интерфейс


// Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. 
// Каждый элемент списка состоит из флага и имени страны.

// Country list UI

// Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, 
// название, столица, население и языки.

// Country info UI

// ВНИМАНИЕ
// Достаточно чтобы приложение работало для большинства стран. 
// Некоторые страны, такие как Sudan, могут создавать проблемы, поскольку название страны является частью названия другой страны, 
// South Sudan.Не нужно беспокоиться об этих исключениях.

// Обработка ошибки
// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, 
// а ошибку со статус кодом 404 - не найдено.Если это не обработать, то пользователь никогда не узнает о том, 
// что поиск не дал результатов.Добавь уведомление "Oops, there is no country with that name" 
// в случае ошибки используя библиотеку notiflix.

// Error alert

// ВНИМАНИЕ
// Не забывай о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис 
// чтобы можно было словить и обработать ошибку
