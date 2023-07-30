import constants from "../data/constants";

const calendarDateParser = (date: Date) => {
  return `${constants.WEEK_DAYS_SHORT[date.getDay()]}, ${date.getDate()} ${
    constants.MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

export default calendarDateParser;
