import calendarDateParser from "../utils/calendarDateParser";
import calendarTimeParser from "../utils/calendarTimeParser";

const BoardCalendar = ({ date }: { date: Date }) => {
  return (
    <div id="calendar">
      <p>{calendarDateParser(date)}</p>
      <p>
        {calendarTimeParser(date).hour}
        <sub>{calendarTimeParser(date).seconds}</sub>
      </p>
    </div>
  );
};

export default BoardCalendar;
