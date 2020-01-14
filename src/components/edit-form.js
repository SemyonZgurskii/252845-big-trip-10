import {getFormatDate, getFormatTime, getMarkupFromArray, getArticle, createElement} from '../utils.js';

const createEventType = (typeName) => {
  return `<div class="event__type-item">
    <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}">
    <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${typeName}</label>
  </div>`;
};

const createCityOption = (city) => {
  return `<option value=${city}></option>`;
};

const createImage = (imageUrl) => {
  return `<img class="event__photo" src=${imageUrl} alt="Event photo">`;
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

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
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
    <button class="event__reset-btn" type="reset">Cancel</button>
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
          ${createImage(photo)}
        </div>
      </div>
    </section>
  </section>
</form>`;
};

export default class EditFormComponent {
  constructor(eventData, transferEventTypes, actionEventTypes, cities) {
    this._eventData = eventData;
    this._transferEventTypes = transferEventTypes;
    this._actionEventTypes = actionEventTypes;
    this._cities = cities;
    this._element = null;
  }

  getTemplate() {
    return createEditFormTemplate(this._eventData, this._transferEventTypes, this._actionEventTypes, this._cities);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}