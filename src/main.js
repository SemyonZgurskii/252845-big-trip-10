import FilterComponent from './components/filter.js';
import InfoComponent from './components/info.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import DayComponent from './components/days.js';
import EventComponent from './components/event.js';
import EditFormComponent from './components/edit-form.js';
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

const renderEvent = (eventData, container) => {
  const eventComponent = new EventComponent(eventData);
  const eventEditComponent = new EditFormComponent(eventData, transferEventTypes, actionEventTypes, cities);
  const containerElement = container.querySelector(`.trip-events__list`);

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    containerElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  });

  const editForm = eventEditComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    containerElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  });

  render(containerElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const days = generateDays(DAYS_COUNT, EVENTS_COUNT);

render(siteMainMenuContainerElement, new MenuComponent(menuNames).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenuContainerElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteTripInfoContainerElement, new InfoComponent(days).getElement(), RenderPosition.AFTERBEGIN);
render(siteContentContainerElement, new SortingComponent().getElement(), RenderPosition.AFTERBEGIN);

days.forEach((it, i) => {
  const day = new DayComponent(it, i + 1).getElement();
  it.forEach((event) => renderEvent(event, day));
  render(eventsListContainerElement, day, RenderPosition.BEFOREEND);
});

