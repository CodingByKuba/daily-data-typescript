import { useParams } from "react-router-dom";
import ContactList from "../components/lists/ContactList";

const Contacts = () => {
  const params = useParams();

  return <div>{params.id ? "Kontakt " + params.id : <ContactList />}</div>;
};

export default Contacts;
