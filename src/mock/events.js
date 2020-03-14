import {getRandomArrayItem} from '../utils/render.js';

const MAX_DESCRIPTION_LENGTH = 3;
const MAX_PRICE = 10000;
const MAX_DATE_GAP = 3;
const MAX_EVENT_DURATION = 1000 * 60 * 180;
const MAX_EVENT_GAP = 1000 * 60 * 600;
const MAX_OPTIONS_COUNT = 2;
const MAX_PHOTOS_COUNT = 4;

const transferEventTypes = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
const actionEventTypes = [`check-in`, `restaurant`, `sightseeing`];
const eventTypes = transferEventTypes.concat(actionEventTypes);
const cities = [`Boston`, `San Francisco`, `Zurich`, `Wellington`, `Osaka`, `London`, `Singapor`, `Bologna`];
const descriptionSource = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const options = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 10,
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: 150,
  },
  {
    type: `food`,
    name: `Add meal`,
    price: 2,
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 9,
  }
];

const getRandomLength = (max) => {
  return Math.ceil(Math.random() * max);
};

const getPhotoUrl = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getPhotos = () => {
  const photosCount = 1 + getRandomLength(MAX_PHOTOS_COUNT);
  return new Array(photosCount)
    .fill(``)
    .map(() => getPhotoUrl());
};


const getBoolean = () => {
  return Math.random() > 0.5;
};

const generateDescription = (descriptionArray) => {
  return descriptionArray
    .split(`. `)
    .filter(() => getBoolean())
    .slice(0, getRandomLength(MAX_DESCRIPTION_LENGTH))
    .join(` `);
};

const getPrice = (max) => {
  return Math.ceil(Math.random() * max);
};

const getRandomDate = () => {
  const date = new Date();
  const diffValue = Math.ceil(Math.random() * MAX_DATE_GAP);

  date.setDate(date.getDate() + diffValue);

  return date;
};

const getEndDate = (startDate) => {
  const endDate = new Date();
  const eventGap = Math.floor(MAX_EVENT_DURATION * Math.random());
  endDate.setTime(startDate.getTime() + eventGap);
  return endDate;
};

const getActiveOptions = () => {
  return options.sort(() => Math.random() - 0.5).slice(0, MAX_OPTIONS_COUNT).filter(() => getBoolean());
};

const generateEvent = (startDate, endDate) => {
  return {
    type: getRandomArrayItem(eventTypes),
    city: getRandomArrayItem(cities),
    photo: getPhotos(),
    description: generateDescription(descriptionSource),
    startDate,
    endDate,
    price: getPrice(MAX_PRICE),
    options: getActiveOptions(),
    isFavorite: getBoolean(),
  };
};

const generateEvents = (count) => {
  let events = [];
  let date = getRandomDate();
  for (let j = 0; j < count; j++) {
    const startDate = new Date();
    startDate.setTime(date.getTime() + Math.floor(MAX_EVENT_DURATION * Math.random()));
    date.setTime(startDate.getTime() + Math.floor(MAX_EVENT_GAP * Math.random()));
    const endDate = new Date();
    endDate.setTime(date.getTime());
    events.push(generateEvent(startDate, endDate));
  }
  return events;
};

export {generateEvents, transferEventTypes, actionEventTypes, cities, generateDescription, descriptionSource};
