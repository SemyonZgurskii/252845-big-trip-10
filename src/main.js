// import {createDayItemTemplate} from './components/days.js/index.js';
// import {createDaysListTemplate} from './components/days-list.js';
import {createFilterTemplate} from './components/filter.js';
import {createInfoTemplate} from './components/info.js';
import {createMenuTemplate} from './components/menu.js';
import {createNewEventTemplate} from './components/new-event.js';
import {createSortingTemplate} from './components/sorting.js';

import {filters} from './mock/filters';
import {menuNames} from './mock/menu.js';
import {generateEvent} from './mock/days';

// const DAYS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteMainMenuContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainMenuHeaderElement = siteMainMenuContainerElement.querySelector(`h2:first-child`);
const siteMainFilterHeaderElement = siteMainMenuContainerElement.querySelector(`h2:nth-child(2)`);
const siteContentContainerElement = document.querySelector(`.trip-events`);
const render = (element, template, place) => {
  element.insertAdjacentHTML(place, template);
};

render(siteTripInfoContainerElement, createInfoTemplate(`Cheboksary`, `Boston`), `afterbegin`);


render(siteMainMenuHeaderElement, createMenuTemplate(menuNames), `afterend`);
render(siteMainFilterHeaderElement, createFilterTemplate(filters), `afterend`);

render(siteContentContainerElement, createSortingTemplate(), `beforeend`);
render(siteContentContainerElement, createNewEventTemplate(generateEvent()), `beforeend`);
// render(siteContentContainerElement, createDaysListTemplate(), `beforeend`);

// const eventsListContainerElement = siteContentContainerElement.querySelector(`.trip-days`);

// new Array(DAYS_COUNT)
//   .fill(``)
//   .forEach(
//       () => render(eventsListContainerElement, createDayItemTemplate(), `beforeend`)
//   );
