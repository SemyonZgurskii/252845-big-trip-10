import {getMarkupFromArray, getArticle} from '../utils/render.js';
import {getFormatDate, getFormatTime} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createEventType = (typeName) => {
  return `<div class="event__type-item">
    <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}">
    <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${typeName}</label>
  </div>`;
};

const createCityOption = (city) => {
  return `<option value=${city}></option>`;
};

const createPhoto = (imageUrl) => {
  return `<img class="event__photo" src=${imageUrl} alt="Event photo">`;
};

const createPhotosList = (photos) => {
  return getMarkupFromArray(photos, createPhoto);
};

const createOption = (price, name, type) => {
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}">
    <label class="event__offer-label" for="event-offer-${type}-1">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createOptionList = (options) => {
  const optionsMarkup = options.map((it) => {
    const {type, name, price} = it;
    return createOption(price, name, type);
  }).join(`\n`);

  const optionsListMarkup = `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${optionsMarkup}
    </div>`;

  return optionsMarkup ? optionsListMarkup : ``;
};

const createEditFormTemplate = (eventsData, transferEventTypes, actionEventTypes, cities) => {
  const {photo, description, startDate, endDate, options, city, type, price} = eventsData;
  const transferTypes = getMarkupFromArray(transferEventTypes, createEventType);
  const actionTypes = getMarkupFromArray(actionEventTypes, createEventType);
  const citiesList = getMarkupFromArray(cities, createCityOption);
  const startTime = getFormatDate(startDate) + ` ` + getFormatTime(startDate);
  const endTime = getFormatDate(endDate) + ` ` + getFormatTime(endDate);

  return `<form class="event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${transferTypes}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${actionTypes}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type + ` ` + getArticle(type, transferEventTypes)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${citiesList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details">

    <section class="event__section  event__section--offers">
      ${createOptionList(options)}
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotosList(photo)}
        </div>
      </div>
    </section>
  </section>
</form>`;
};

export default class EditFormComponent extends AbstractComponent {
  constructor(eventData, transferEventTypes, actionEventTypes, cities) {
    super();
    this._eventData = eventData;
    this._transferEventTypes = transferEventTypes;
    this._actionEventTypes = actionEventTypes;
    this._cities = cities;
  }

  getTemplate() {
    return createEditFormTemplate(this._eventData, this._transferEventTypes, this._actionEventTypes, this._cities);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
