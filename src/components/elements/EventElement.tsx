import { NavLink } from "react-router-dom";
import { EventType } from "../../data/types";
import dateParser from "../../utils/dateParser";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";

const EventElement = (props: EventType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDelete = () => {
    if (confirm('Czy chcesz usunąć wydarzenie "' + props.title + '"?')) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_EVENTS,
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
            payload: { events: response.data.events },
          });
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  return (
    <article>
      <NavLink to={props.id}>{props.title}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      {props.comment && <pre>{props.comment}</pre>}
      <p>Odbędzie się: {dateParser(props.time)}</p>
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && <span>Edytowano: {dateParser(props.updatedAt)}</span>}
      {!props.noDelete && (
        <div className="delete">
          <button onClick={handleDelete}>Usuń</button>
        </div>
      )}
    </article>
  );
};

export default EventElement;
