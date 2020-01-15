import {createElement} from '../utils.js';

const createDaysListTemplate = () => {
  return `<ul class="trip-days">
  </ul>`;
};

export default class DaysListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate();
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
