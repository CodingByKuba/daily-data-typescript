const dateParser = (date: Date): string => {
  const newDate = new Date(date);
  let month =
    (newDate.getMonth() < 9 ? "0" : "") + (newDate.getMonth() + 1).toString();
  let minutes =
    (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes().toString();
  return `${newDate.getDate()}.${month}.${newDate.getFullYear()} o ${newDate.getHours()}:${minutes}`;
};

export default dateParser;
