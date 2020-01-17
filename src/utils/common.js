
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getFormatDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
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

export {getFormatDate, getFormatTime, getFormatDateTime};
