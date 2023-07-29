export const inputDateParser = (date: Date): string => {
  const newDate = new Date(date);
  let day = (newDate.getDate() < 10 ? "0" : "") + newDate.getDate().toString();
  let month =
    (newDate.getMonth() < 9 ? "0" : "") + (newDate.getMonth() + 1).toString();
  return `${newDate.getFullYear()}-${month}-${day}`;
};

export const inputTimeParser = (date: Date): string => {
  const newDate = new Date(date);
  let minute =
    (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes().toString();
  let hour =
    (newDate.getHours() < 10 ? "0" : "") + newDate.getHours().toString();
  return `${hour}:${minute}`;
};
