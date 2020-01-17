import {MONTH_NAMES} from '../const.js';
import AbstractComponent from './abstract-component.js';

const getDatesInterval = (startDate, finishDate) => {
  return startDate.getMonth() === finishDate.getMonth() ?
    `${MONTH_NAMES[startDate.getMonth()]} ${startDate.getDate()} &mdash; ${finishDate.getDate()}` :
    `${MONTH_NAMES[startDate.getMonth()]} ${startDate.getDate()} &mdash; ${MONTH_NAMES[finishDate.getMonth()]} ${finishDate.getDate()}`;
};


const createInfoTemplate = (days) => {
  const firstEvent = days[0][0];
  const startPoint = firstEvent.city;
  const finishPoint = days[days.length - 1][days.length - 1].city;
  const startDate = firstEvent.startDate;
  const finishDate = firstEvent.endDate;
  const overallPrice = days.map((day) => day.map((event) => event.price)
      .reduce((summ, currentPrice) => summ + currentPrice))
      .reduce((summ, currentPrice) => summ + currentPrice);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${startPoint} &mdash; ... &mdash; ${finishPoint}</h1>

    <p class="trip-info__dates">${getDatesInterval(startDate, finishDate)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${overallPrice}</span>
  </p>
</section>`;
};

export default class InfoComponent extends AbstractComponent {
  constructor(days) {
    super();
    this._days = days;
  }

  getTemplate() {
    return createInfoTemplate(this._days);
  }
}
