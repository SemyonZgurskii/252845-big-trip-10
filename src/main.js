import DayComponent from './components/days.js';
import FilterComponent from './components/filter.js';
import InfoComponent from './components/info.js';
import MenuComponent from './components/menu.js';
import NewEventComponent from './components/new-event.js';
import SortingComponent from './components/sorting.js';
import {render, RenderPosition} from './utils.js';

import {filters} from './mock/filters';
import {menuNames} from './mock/menu.js';
import {generateDays, transferEventTypes, actionEventTypes, cities} from './mock/days';

const DAYS_COUNT = 3;
const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteMainMenuContainerElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteContentContainerElement = document.querySelector(`.trip-events`);
const eventsListContainerElement = siteContentContainerElement.querySelector(`.trip-days`);

const days = generateDays(DAYS_COUNT, EVENTS_COUNT);



render(siteMainMenuContainerElement, new MenuComponent(menuNames).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenuContainerElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteTripInfoContainerElement, new InfoComponent(days).getElement(), RenderPosition.AFTERBEGIN);
// render(siteContentContainerElement, new NewEventComponent(days[0].shift(), transferEventTypes, actionEventTypes, cities).getElement(), RenderPosition.AFTERBEGIN);
days.forEach((it, i) => renderDay(it, i + 1));
render(siteContentContainerElement, new SortingComponent().getElement(), RenderPosition.AFTERBEGIN);
// days.forEach((it, i) => render(eventsListContainerElement, new DayComponent(it, i + 1).getElement(), RenderPosition.BEFOREEND));

// стрелка вниз - click | event__rollup-btn
//, тег form - submit | trip-events__item

