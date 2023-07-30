import { useUserContext } from "../../context/UserContext";
import { ContactType } from "../../data/types";
import { contactsSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import Contact from "../elements/ContactElement";

const ContactList = () => {
  const { userState } = useUserContext();

  const sortedContacts: ContactType[] =
    userState.contacts.length > 0 ? contactsSorter(userState) : [];

  if (sortedContacts.length === 0)
    return <InfoBox type="info" message="Brak kontaktów" />;

  return (
    <>
      {sortedContacts.map((el: ContactType) => (
        <Contact
          key={el.id}
          id={el.id}
          name={el.name}
          phone={el.phone}
          email={el.email}
          debt={el.debt}
          comment={el.comment}
          instagramLink={el.instagramLink}
          facebookLink={el.facebookLink}
          createdAt={el.createdAt}
          updatedAt={el?.updatedAt || undefined}
        />
      ))}
    </>
  );
};

export default ContactList;
