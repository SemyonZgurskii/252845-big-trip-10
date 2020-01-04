import {getFormatDateTime, getFormatTime, getRandomArrayItem} from '../utils.js';

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
  const {transferEventTypes, actionEventTypes, cities, date, price, options} = eventData;

  const startTime = getFormatTime(date);
  const startDateTime = getFormatDateTime(date);
  const timeGap = Math.ceil(120 * Math.random());
  date.setMinutes(date.getMinutes() + timeGap);
  const gapHours = Math.floor(timeGap / 60) + `H`;
  const gapMinutes = timeGap % 60 + `M`;
  const duration = gapHours + ` ` + gapMinutes;
  const endDateTime = getFormatDateTime(date);
  const endTime = getFormatTime(date);
  const optionsList = createOptionList(options);
  const eventType = getRandomArrayItem(transferEventTypes.concat(actionEventTypes));
  const eventName = eventType + ` ` + getRandomArrayItem(cities);

  return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
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

const createDayItemTemplate = (events) => {
  const eventsMarkup = events
    .map((it) => createEventTemplate(it))
    .join(`\n`);
  const dayNumber = 1;
  const date = 1;
  const monthDay = 1;

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
