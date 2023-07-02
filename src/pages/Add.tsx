import { useParams } from "react-router-dom";

const Add = () => {
  const params = useParams();

  return <div>{params.type ? "Dodaj " + params.type : "Dodaj"}</div>;
};

export default Add;
