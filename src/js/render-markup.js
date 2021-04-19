// import countriesListTpl from "../templates/countries-list.hbs";
// import countryCardTpl from "../templates/country-card.hbs";
import { refs } from "./get-refs.js";

function renderCardMarkup(tpl, value) {
    const markup = tpl(value);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function renderListMarkup(tpl, value) {
    const markup = tpl(value);
    refs.listContainer.insertAdjacentHTML('beforeend', markup);
}

export default { renderCardMarkup, renderListMarkup } ;