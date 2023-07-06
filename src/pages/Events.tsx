import { useParams } from "react-router-dom";
import EventList from "../components/lists/EventList";

const Events = () => {
  const params = useParams();

  return <>{params.id ? "Wydarzenie " + params.id : <EventList />}</>;
};

export default Events;
