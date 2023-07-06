import { useParams } from "react-router-dom";
import EventList from "../components/lists/EventList";

const Events = () => {
  const params = useParams();

  return <div>{params.id ? "Wydarzenie " + params.id : <EventList />}</div>;
};

export default Events;
