import EventComponent from '../components/event.js';
import EditFormComponent from '../components/edit-form.js';

import {replace, render, RenderPosition} from '../utils/render.js';
import {transferEventTypes, actionEventTypes, cities} from '../mock/days.js';

export default class PointController {
  constructor(container, onDataChange) {
    // container — элемент, к которому он будет аппендить точку маршрута и форму редактирования.

    this._container = container;
    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._eventEditComponent = null;
  }

  // должен принимать данные одной точки маршрута. Так же в него должен переехать код, который отвечает за отрисовку точки маршрута, ее замену на форму редактирования и наоборот, а также установка связанных с этим обработчиков событий.
  get container() {
    return this._container;
  }

  renderEvent(eventData, container) {
    this._eventComponent = new EventComponent(eventData);
    this._eventEditComponent = new EditFormComponent(eventData, transferEventTypes, actionEventTypes, cities);
    const containerElement = container.querySelector(`.trip-events__list`);
    const editForm = this._eventEditComponent.getElement();
    const replaceEventToEdit = () => {
      replace(this._eventEditComponent, this._eventComponent);
    };
    const replaceEditToEvent = () => {
      replace(this._eventComponent, this._eventEditComponent);
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        resetForm();
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    const resetForm = () => {
      editForm.reset();
    };
    this._eventComponent.setEditButtonClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._eventEditComponent.setSubmitHandler(replaceEditToEvent);
    this._eventEditComponent.setRollupClickHandler(() => {
      resetForm();
      replaceEditToEvent();
    });
    this._eventEditComponent.setFavoriteClickHandler(() => {
      // debugger;
      this._onDataChange(this, eventData, Object.assign({}, eventData, {
        isFavorite: !eventData.isFavorite,
      }));
    });
    render(containerElement, this._eventComponent, RenderPosition.BEFOREEND);
  }
}
