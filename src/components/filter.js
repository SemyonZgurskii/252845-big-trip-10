import AbstractComponent from './abstract-component.js';

const createFilter = (filterName, isChecked) => {
  return `<div class="trip-filters__filter">
    <input
      id="filter-${filterName.toLowerCase()}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filterName.toLowerCase()}"
      ${isChecked ? `checked` : ``}
    >
    <label class="trip-filters__filter-label" for="filter-${filterName.toLowerCase()}">${filterName}</label>
  </div>`;
};

const createFilterTemplate = (filterNames) => {
  const filters = filterNames.map((it, i) => createFilter(it, i === 0)).join(`\n`);

  return `<div>
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
};

export default class FilterComponent extends AbstractComponent {
  constructor(filterNames) {
    super();
    this._filterNames = filterNames;
  }

  getTemplate() {
    return createFilterTemplate(this._filterNames);
  }
}
