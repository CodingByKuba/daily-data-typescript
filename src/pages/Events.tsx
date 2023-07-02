import { useParams } from "react-router-dom";

const Events = () => {
  const params = useParams();

  return <div>{params.id ? "Wydarzenie " + params.id : "Wydarzenia"}</div>;
};

export default Events;
