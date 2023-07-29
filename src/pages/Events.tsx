import { useParams } from "react-router-dom";
import EventList from "../components/lists/EventList";
import EventEditor from "../components/editors/EventEditor";

const Events = () => {
  const params = useParams();

  return params.id ? <EventEditor id={params.id} /> : <EventList />;
};

export default Events;
