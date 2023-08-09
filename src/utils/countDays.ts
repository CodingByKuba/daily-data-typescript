const countDays = (date: Date) => {
  if (new Date(date).toString() == "Invalid Date") return 999;

  return Math.floor(
    (new Date(date).getTime() - new Date().getTime()) / 1000 / 3600 / 24
  );
};

export default countDays;
