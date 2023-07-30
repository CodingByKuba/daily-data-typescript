const calendarTimeParser = (date: Date) => {
  return {
    hour: `${date.getHours()}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`,
    seconds:
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
  };
};

export default calendarTimeParser;
