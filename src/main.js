import {createDaysListTemplate, createDayItemTemplate} from './components/days.js';
import {createFilterTemplate} from './components/filter.js';
import {createInfoTemplate} from './components/info.js';
import {createMenuTemplate} from './components/menu.js';
import {createNewEventTemplate} from './components/new-event.js';
import {createSortingTemplate} from './components/sorting.js';

import {filters} from './mock/filters';
import {menuNames} from './mock/menu.js';
import {generateDays, transferEventTypes, actionEventTypes, cities} from './mock/days';

const DAYS_COUNT = 3;
const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteMainMenuContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainMenuHeaderElement = siteMainMenuContainerElement.querySelector(`h2:first-child`);
const siteMainFilterHeaderElement = siteMainMenuContainerElement.querySelector(`h2:nth-child(2)`);
const siteContentContainerElement = document.querySelector(`.trip-events`);
const render = (element, template, place) => {
  element.insertAdjacentHTML(place, template);
};

const days = generateDays(DAYS_COUNT, EVENTS_COUNT);

render(siteContentContainerElement, createSortingTemplate(), `beforeend`);
render(siteContentContainerElement, createNewEventTemplate(days[0].shift(), transferEventTypes, actionEventTypes, cities), `beforeend`);
render(siteContentContainerElement, createDaysListTemplate(), `beforeend`);
const eventsListContainerElement = siteContentContainerElement.querySelector(`.trip-days`);
days.forEach((it, i) => render(eventsListContainerElement, createDayItemTemplate(it, i + 1), `beforeend`));
render(siteTripInfoContainerElement, createInfoTemplate(days), `afterbegin`);
render(siteMainMenuHeaderElement, createMenuTemplate(menuNames), `afterend`);
render(siteMainFilterHeaderElement, createFilterTemplate(filters), `afterend`);
