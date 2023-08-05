import { useEffect, useState } from "react";
import { ContactType } from "../../data/types";
import { useUserContext } from "../../context/UserContext";
import config from "../../data/config";
import { ReducerActions } from "../../data/enums";
import { useFetchContext } from "../../context/FetchContext";
import InfoBox from "../InfoBox";
import Loader from "../Loader";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineSolution,
} from "react-icons/ai";

const ContactEditor = (props: Pick<ContactType, "id">) => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [contactFinded, setContactFinded] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactComment, setContactComment] = useState<string>("");
  const [contactInstagram, setContactInstagram] = useState<string>("");
  const [contactFacebook, setContactFacebook] = useState<string>("");

  const [fetchSuccess, setFetchSuccess] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");

  const handleSubmit = () => {
    setFetchSuccess("");
    setFetchError("");
    fetchCallback({
      url: config.AX_ROUTE_CONTACTS,
      method: props.id !== "none" ? "PUT" : "POST",
      payload: {
        username: userState.username,
        token: userState.token,
        id: props.id,
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        comment: contactComment,
        instagram: contactInstagram,
        facebook: contactFacebook,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setFetchError(response.data.error);
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { contacts: response.data.contacts },
        });
        setFetchSuccess(
          "Kontakt został " + (props.id !== "none" ? "edytowany" : "dodany")
        );
        if (!contactFinded && props.id === "none") {
          setContactName("");
          setContactPhone("");
          setContactEmail("");
          setContactComment("");
          setContactInstagram("");
          setContactFacebook("");
        }
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    if (props.id !== "none") {
      let findContact: ContactType = userState.contacts.find(
        (el: ContactType) => el.id === props.id
      );
      if (findContact.id) {
        setContactName(findContact.name);
        setContactPhone(findContact.phone ? findContact.phone.toString() : "");
        setContactEmail(findContact.email || "");
        setContactComment(findContact.comment || "");
        setContactInstagram(findContact.instagramLink || "");
        setContactFacebook(findContact.facebookLink || "");
        setContactFinded(true);
      }
    }
  }, []);

  if (!contactFinded && props.id !== "none")
    return <div>Nie znaleziono kontaktu</div>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fetchError && <InfoBox type="error" message={fetchError} />}
        {fetchSuccess && <InfoBox type="success" message={fetchSuccess} />}
        <div>
          <AiOutlineSolution size={25} />
          <input
            placeholder="Nazwa kontaktu..."
            type=""
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div>
          <AiOutlinePhone size={25} />
          <input
            placeholder="Telefon..."
            type="number"
            step="1"
            value={contactPhone?.toString()}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
        <div>
          <AiOutlineMail size={25} />
          <input
            placeholder="Email..."
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div>
          <AiOutlineInstagram size={25} />
          <input
            placeholder="Instagram..."
            value={contactInstagram}
            onChange={(e) => setContactInstagram(e.target.value)}
          />
        </div>
        <div>
          <AiOutlineFacebook size={25} />
          <input
            placeholder="Facebook..."
            value={contactFacebook}
            onChange={(e) => setContactFacebook(e.target.value)}
          />
        </div>

        <p>Komentarz:</p>
        <textarea
          value={contactComment}
          onChange={(e) => setContactComment(e.target.value)}
        />
        {isPending ? (
          <Loader />
        ) : (
          <button type="submit">
            {props.id !== "none" ? "Edytuj" : "Dodaj"}
          </button>
        )}
      </form>
    </>
  );
};

export default ContactEditor;
