import { useUserContext } from "../../context/UserContext";
import { ContactType } from "../../data/types";
import { contactsSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import SearchBar from "../SearchBar";
import Contact from "../elements/ContactElement";
import { useState, useCallback } from "react";

const ContactList = () => {
  const { userState } = useUserContext();
  const [searchString, setSearchString] = useState<string>("");

  const sortedContacts: ContactType[] =
    userState.contacts.length > 0
      ? contactsSorter(userState).filter(
          (el) =>
            el.name?.toUpperCase().includes(searchString.toUpperCase()) ||
            el.comment?.toUpperCase().includes(searchString.toUpperCase()) ||
            el.phone?.toString().includes(searchString)
        )
      : [];

  const handleChangeSearch = useCallback(
    (e: any) => {
      setSearchString(e.target.value);
    },
    [searchString]
  );

  return (
    <>
      <div id="separator"></div>
      <SearchBar value={searchString} onChange={handleChangeSearch} />
      {sortedContacts.length === 0 ? (
        <InfoBox type="info" message="Brak kontaktów" />
      ) : (
        sortedContacts.map((el: ContactType) => (
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
        ))
      )}
    </>
  );
};

export default ContactList;
