import './css/styles.css';
import { refs } from './js/get-refs.js';
import API from './js/fetch-countries.js';
import TPL from './js/render-markup.js';
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

refs.searchInput.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  refs.cardContainer.innerHTML = '';
  refs.listContainer.innerHTML = '';
  const searchInputValue = e.target.value;

  if (searchInputValue === '') {
    return;
  }

  API.fetchCountries(searchInputValue)
    .then(isFetchSucces)
    .catch(error => console.log(error));
}

function isFetchSucces(countries) {
  if (countries.length > 10) {
    error('Too many matches found. Enter more specific query!');
  } else if (countries.length <= 10 && countries.length > 1) {
    TPL.renderListMarkup(countriesListTpl, countries);
  } else if (countries.length === 1) {
    TPL.renderCardMarkup(countryCardTpl, countries);
  } else {
    error('Invalid country name. Enter correct query!');
  }
}
