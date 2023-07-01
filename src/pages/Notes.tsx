import { useParams } from "react-router-dom";

const Notes = () => {
  const params = useParams();

  return <div>{params.id ? "Notatka " + params.id : "Notatki"}</div>;
};

export default Notes;
