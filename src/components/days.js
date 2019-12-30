const createOption = (optionName, optionPrice) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${optionName}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${optionPrice}</span>
  </li>`;
};

const createDayItemTemplate = (eventData, dayNumber) => {
  const {transferEventTypes, actionEventTypes, cities, photo, description, date, time, price, options} = eventData;
  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime=${date}>${monthDay}</time>
    </div>

    <ul class="trip-events__list">
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src=${photo} alt="Event type icon">
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
            ${options}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    </ul>
  </li>`;
};

const createDaysListTemplate = () => {
  return `<ul class="trip-days">
</ul>`;
};

export {createDayItemTemplate, createDaysListTemplate};
