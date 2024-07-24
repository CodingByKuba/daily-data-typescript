type PropsType = {
  color?: "red" | "orange" | "gray";
};

const EventDot = (props: PropsType) => {
  return <div id="event-dot" className={props.color || undefined}></div>;
};

export default EventDot;
