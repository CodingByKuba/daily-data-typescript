import { useParams } from "react-router-dom";
import ContactList from "../components/lists/ContactList";
import ContactEditor from "../components/editors/ContactEditor";

const Contacts = () => {
  const params = useParams();

  return <>{params.id ? <ContactEditor id={params.id} /> : <ContactList />}</>;
};

export default Contacts;
