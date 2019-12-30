const createMenuItem = (menuName, isChecked) => {
  return `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuName}</a>`;
};


export const createMenuTemplate = (menuNames) => {
  const menu = menuNames.map((it, i) => createMenuItem(it, i === 0)).join(`\n`);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${menu}
  </nav>`;
};
