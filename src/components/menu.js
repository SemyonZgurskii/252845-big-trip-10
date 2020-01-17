import AbstractComponent from './abstract-component.js';

const createMenuItem = (menuName, isChecked) => {
  return `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuName}</a>`;
};


const createMenuTemplate = (menuNames) => {
  const menu = menuNames.map((it, i) => createMenuItem(it, i === 0)).join(`\n`);

  return `<div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${menu}
    </nav>
  </div>`;
};

export default class MenuComponent extends AbstractComponent {
  constructor(menuNames) {
    super();
    this._menuNames = menuNames;
  }

  getTemplate() {
    return createMenuTemplate(this._menuNames);
  }
}
