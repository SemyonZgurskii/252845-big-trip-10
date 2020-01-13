import {createElement, getFormatDateTime} from '../utils.js';
import {MONTH_NAMES} from '../const.js';

const createDayItemTemplate = (events, dayNumber) => {
  const date = getFormatDateTime(events[0].startDate);
  const monthDay = events[0].startDate.getDate() + ` ` + MONTH_NAMES[events[0].startDate.getMonth()];

  return `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${dayNumber}</span>
    <time class="day__date" datetime=${date}>${monthDay}</time>
  </div>

  <ul class="trip-events__list">
  </ul>
</li>`;
};

export default class DayComponent {
  constructor(events, dayNumber) {
    this._events = events;
    this._dayNumber = dayNumber;
    this._element = null;
  }

  getTemplate() {
    return createDayItemTemplate(this._events, this._dayNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._elemnt = null;
  }
}
