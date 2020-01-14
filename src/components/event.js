import {transferEventTypes} from '../mock/days.js';
import {getFormatDateTime, getFormatTime, getArticle, createElement} from '../utils.js';

const createOption = (optionName, optionPrice) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${optionName}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${optionPrice}</span>
  </li>`;
};

const createOptionList = (options) => {
  return options
    .map((it) => createOption(it.name, it.price))
    .join(`\n`);
};

const createEventTemplate = (eventData) => {
  const {type, city, startDate, endDate, price, options} = eventData;

  const startTime = getFormatTime(startDate);
  const startDateTime = getFormatDateTime(startDate);
  const timeGap = Math.round((endDate.getTime() - startDate.getTime()) / (60 * 1000));
  const gapHours = Math.floor(timeGap / 60) + `H`;
  const gapMinutes = timeGap % 60 + `M`;
  const duration = timeGap / 60 >= 1 ? (gapHours + ` ` + gapMinutes) : gapMinutes;
  const endDateTime = getFormatDateTime(endDate);
  const endTime = getFormatTime(endDate);
  const optionsList = createOptionList(options);
  const eventName = type + ` ` + getArticle(type, transferEventTypes) + ` ` + city;

  return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${eventName}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${startDateTime}>${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime=${endDateTime}>${endTime}</time>
            </p>
            <p class="event__duration">${duration}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${optionsList}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`;
};

export default class EventComponent {
  constructor(eventData) {
    this._eventData = eventData;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._eventData);
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
