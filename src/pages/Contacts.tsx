import { useParams } from "react-router-dom";
import ContactList from "../components/lists/ContactList";

const Contacts = () => {
  const params = useParams();

  return <>{params.id ? "Kontakt " + params.id : <ContactList />}</>;
};

export default Contacts;
