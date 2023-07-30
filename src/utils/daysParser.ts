const daysParse = (date: Date) => {
  if (new Date(date).toString() == "Invalid Date") return "Nieprawidłowa data";
  let currentDate = new Date(date);
  let newDate: Date = new Date();

  let countDays = Math.floor(
    (new Date(date).getTime() - newDate.getTime()) / 1000 / 3600 / 24
  );
  let countMonths = Math.floor(countDays / 31);
  let countYears = Math.floor(countDays / 365);

  if (countDays > 365)
    return `ponad ${countYears} ${countYears === 1 ? "rok" : ""}${
      countYears === 0 || (countYears >= 2 && countYears <= 4) ? "lata" : ""
    }${countYears > 4 ? "lat" : ""}`;
  if (countDays >= 31 && countDays <= 365)
    return `ponad ${countMonths} ${countMonths === 1 ? "miesiąc" : ""}${
      countMonths === 0 || (countMonths >= 2 && countMonths <= 4)
        ? "miesiące"
        : ""
    }${countMonths > 4 ? "miesięcy" : ""}`;
  if (countDays > 0 && countDays < 31)
    return `za ${countDays} ${countDays === 1 ? "dzień" : "dni"}`;
  if (countDays === 0)
    return `${
      currentDate.getDate() === newDate.getDate() ? "dzisiaj" : "jutro"
    }`;
  if (countDays < 0) return "termin minął";
};

export default daysParse;
