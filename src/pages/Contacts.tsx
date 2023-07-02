import { useParams } from "react-router-dom";

const Contacts = () => {
  const params = useParams();

  return <div>{params.id ? "Kontakt " + params.id : "Kontakty"}</div>;
};

export default Contacts;
