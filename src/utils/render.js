const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const getRandomArrayInteger = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getRandomArrayItem = (array) => {
  return array[getRandomArrayInteger(array)];
};

const getMarkupFromArray = (array, callback) => {
  return array
  .map((it) => callback(it))
  .join(`\n`);
};

const getArticle = (type, array) => {
  return array.includes(type) ? `to` : `at`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElement = !!(parentElement && newElement && oldElement);

  if (isExistElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {getRandomArrayItem, getMarkupFromArray, getArticle, createElement, render, RenderPosition, replace};
