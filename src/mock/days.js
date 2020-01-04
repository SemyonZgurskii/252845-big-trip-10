const MAX_DESCRIPTION_LENGTH = 3;
const MAX_PRICE = 10000;
const MAX_DATE_GAP = 15;

const transferEventTypes = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
const actionEventTypes = [`check-in`, `restaurant`, `sightseeing`];

const cities = [`Boston`, `San Francisco`, `Zurich`, `Wellington`, `Osaka`, `London`, `Singapor`, `Bologna`];

const photoUrl = `http://picsum.photos/300/150?r=${Math.random()}`;

const descriptionSource = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

const options = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 10,
  },
  {
    type: `seats`,
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

const getDescriptionLength = (max) => {
  return Math.ceil(Math.random() * max);
};

const getBoolean = () => {
  return Math.random() > 0.5;
};

const generateDescription = (descriptionArray) => {
  return descriptionArray
    .filter(() => getBoolean())
    .slice(0, getDescriptionLength(MAX_DESCRIPTION_LENGTH))
    .join(` `);
};

const getPrice = (max) => {
  return Math.ceil(Math.random() * max);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = Math.ceil(Math.random() * MAX_DATE_GAP);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getActiveOptions = (isActive) => {
  return options.map((it) => {
    return isActive ? it : ``;
  }).slice(0, 2);
};

const generateEvent = () => {
  return {
    transferEventTypes,
    actionEventTypes,
    cities,
    photo: photoUrl,
    description: generateDescription(descriptionSource),
    date: getRandomDate(),
    price: getPrice(MAX_PRICE),
    options: getActiveOptions(getBoolean),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
