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
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";

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
      {props.phone && (
        <p>
          <AiOutlinePhone /> <a href={`tel: ${props.phone}`}>{props.phone}</a>
        </p>
      )}
      {props.email && (
        <p>
          <AiOutlineMail /> <a href={`mailto: ${props.email}`}>{props.email}</a>
        </p>
      )}
      {props.facebookLink && (
        <p>
          <AiOutlineFacebook />{" "}
          <a href={props.facebookLink} target="_blank">
            {props.facebookLink}
          </a>
        </p>
      )}
      {props.instagramLink && (
        <p>
          <AiOutlineInstagram />{" "}
          <a href={props.instagramLink} target="_blank">
            {props.instagramLink}
          </a>
        </p>
      )}
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && props.updatedAt !== props.createdAt && (
        <span>Edytowano: {dateParser(props.updatedAt)}</span>
      )}
      <DeleteButton handleClick={handleDelete} />
    </article>
  );
};

export default ContactElement;
