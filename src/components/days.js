import {getFormatDateTime} from '../utils/common.js';
import {MONTH_NAMES} from '../const.js';
import AbstractComponent from './abstract-component.js';

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

export default class DayComponent extends AbstractComponent {
  constructor(events, dayNumber) {
    super();
    this._events = events;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createDayItemTemplate(this._events, this._dayNumber);
  }
}
