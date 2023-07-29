import { NavLink } from "react-router-dom";
import { ContactType } from "../../data/types";
import dateParser from "../../utils/dateParser";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";
import DeleteButton from "../DeleteButton";

const ContactElement = (props: ContactType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDelete = () => {
    if (confirm('Czy chcesz usunąć kontakt "' + props.name + '"?')) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_CONTACTS,
        method: "DELETE",
        payload: {
          username: userState.username,
          token: userState.token,
          id: props.id,
        },
        successCallback: (response: any) => {
          if (response.data.error) return setDeleteError(response.data.error);
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { contacts: response.data.contacts },
          });
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  return (
    <article>
      <NavLink to={props.id}>{props.name}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      {props.comment && <pre>{props.comment}</pre>}
      {props.phone && <p>Telefon: {props.phone}</p>}
      {props.email && <p>E-Mail: {props.email}</p>}
      {props.facebookLink && <p>Facebook: {props.facebookLink}</p>}
      {props.instagramLink && <p>Instagram: {props.instagramLink}</p>}
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && <span>Edytowano: {dateParser(props.updatedAt)}</span>}
      <DeleteButton handleClick={handleDelete} />
    </article>
  );
};

export default ContactElement;
