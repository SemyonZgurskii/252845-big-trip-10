const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

const getFormatDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth());
  const year = date.getFullYear() % 100;
  return day + `/` + month + `/` + year;
};

const getFormatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getFormatDateTime = (date) => {
  const year = date.getFullYear();
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDate());
  const time = getFormatTime(date);

  return `${year}-${month}-${day}T${time}`;
};

const getRandomArrayItem = (array) => {
  return array[Math.ceil(Math.random() * (array.length - 1))];
};

export {castTimeFormat, formatTime, getFormatDate, getFormatTime, getFormatDateTime, getRandomArrayItem};
