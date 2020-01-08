import {getFormatDateTime, getFormatTime, getMarkupFromArray} from '../utils.js';
import {MONTH_NAMES} from '../const.js';

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
  const gapHours = Math.ceil(timeGap / 60) + `H`;
  const gapMinutes = timeGap % 60 + `M`;
  const duration = timeGap % 60 >= 1 ? (gapHours + ` ` + gapMinutes) : gapMinutes;
  const endDateTime = getFormatDateTime(endDate);
  const endTime = getFormatTime(endDate);
  const optionsList = createOptionList(options);
  const eventName = type + ` ` + city;

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

const createDayItemTemplate = (events, dayNumber) => {
  const eventsMarkup = getMarkupFromArray(events, createEventTemplate);
  const date = getFormatDateTime(events[0].startDate);
  const monthDay = events[0].startDate.getDate() + ` ` + MONTH_NAMES[events[0].startDate.getMonth()];

  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${dayNumber}</span>
    <time class="day__date" datetime=${date}>${monthDay}</time>
  </div>

  <ul class="trip-events__list">
    ${eventsMarkup}
  </ul>
</li>`;
};

const createDaysListTemplate = () => {
  return `<ul class="trip-days">
</ul>`;
};

export {createDayItemTemplate, createDaysListTemplate};
