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

export const createFilterTemplate = (filterNames) => {
  const filters = filterNames.map((it, i) => createFilter(it, i === 0)).join(`\n`);

  return `<form class="trip-filters" action="#" method="get">
    ${filters}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
