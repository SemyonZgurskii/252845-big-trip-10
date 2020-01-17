import FilterComponent from './components/filter.js';
import InfoComponent from './components/info.js';
import MenuComponent from './components/menu.js';
import TripController from './controller/trip-controller.js';
import {render, RenderPosition} from './utils/render.js';

import {filters} from './mock/filters';
import {menuNames} from './mock/menu.js';
import {generateDays} from './mock/days';

const DAYS_COUNT = 3;
const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteMainMenuContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteContentContainerElement = document.querySelector(`.trip-events`);

const days = generateDays(DAYS_COUNT, EVENTS_COUNT);

render(siteMainMenuContainerElement, new MenuComponent(menuNames), RenderPosition.AFTERBEGIN);
render(siteMainMenuContainerElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
render(siteTripInfoContainerElement, new InfoComponent(days), RenderPosition.AFTERBEGIN);
const tripController = new TripController(siteContentContainerElement);
tripController.render(days);
