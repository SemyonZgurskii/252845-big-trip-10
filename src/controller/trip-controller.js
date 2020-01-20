import EventComponent from '../components/event.js';
import EditFormComponent from '../components/edit-form.js';
import SortingComponent, {SortType} from '../components/sorting.js';
import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/days.js';
import NoEventsComponent from '../components/no-events.js';

import {replace, render, RenderPosition} from '../utils/render.js';
import {transferEventTypes, actionEventTypes, cities} from '../mock/days.js';

const getDurationEnequality = (event) => {
  return (event.endDate - event.startDate);
};

const renderEvent = (eventData, container) => {
  const eventComponent = new EventComponent(eventData);
  const eventEditComponent = new EditFormComponent(eventData, transferEventTypes, actionEventTypes, cities);
  const containerElement = container.querySelector(`.trip-events__list`);
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };
  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      resetForm();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  eventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  const editForm = eventEditComponent.getElement();
  const resetForm = () => {
    editForm.reset();
  };
  eventEditComponent.setSubmitHandler(replaceEditToEvent);
  eventEditComponent.setClickHandler(() => {
    resetForm();
    replaceEditToEvent();
  });
  render(containerElement, eventComponent, RenderPosition.BEFOREEND);
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortingComponent = new SortingComponent();
    this._daysListComponent = new DaysListComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._days = [];
    this._daysCopy = [];
  }


  render(days) {

    this._days = days;
    this._daysCopy = this._days.slice();

    const renderDays = (daysArray, container) => {
      daysArray.forEach((it, i) => {
        const day = new DayComponent(it, i + 1);
        it.forEach((event) => renderEvent(event, day.getElement()));
        render(container, day, RenderPosition.BEFOREEND);
      });
    };

    if (days.length > 1) {
      render(this._container, this._sortingComponent, RenderPosition.AFTERBEGIN);
      render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
      const eventsListContainerElement = this._container.querySelector(`.trip-days`);
      renderDays(days, eventsListContainerElement);
    } else {
      render(this._container, this._noEventsComponent.getElement(), RenderPosition.BEFOREEND);
    }

    this._sortingComponent.onSortTypeChange((sortType) => {
      switch (sortType) {
        case SortType.PRICE:
          this._daysCopy = this._daysCopy.map((it) => it.slice().sort((a, b) => a.price - b.price));
          break;
        case (SortType.PRICE + `Reversed`):
          this._daysCopy = this._daysCopy.map((it) => it.reverse());
          break;
        case SortType.TIME:
          this._daysCopy = this._daysCopy.map((it) => it.slice().sort((a, b) => getDurationEnequality(a) - getDurationEnequality(b)));
          break;
        case (SortType.TIME + `Reversed`):
          this._daysCopy = this._daysCopy.map((it) => it.reverse());
          break;
        case SortType.DEFAULT:
          this._daysCopy = this._days;
          break;
      }
      const eventsListContainerElement = this._container.querySelector(`.trip-days`);
      eventsListContainerElement.innerHTML = ``;
      renderDays(this._daysCopy, eventsListContainerElement);
    });
  }
}
