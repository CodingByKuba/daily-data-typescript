import { NavLink } from "react-router-dom";
import { EventType } from "../../data/types";
import dateParser from "../../utils/dateParser";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";
import DeleteButton from "../DeleteButton";
import daysParse from "../../utils/daysParser";
import EventDot from "../EventDot";
import countDays from "../../utils/countDays";

const EventElement = (props: EventType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  let daysLeft = countDays(props.time);

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
      <NavLink to={"/events/" + props.id}>{props.title}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      <p>Odbędzie się: {dateParser(props.time)}</p>
      <p
        className={daysLeft < 3 ? "red" : daysLeft < 15 ? "orange" : undefined}
      >
        ({daysParse(props.time)})
      </p>
      {props.comment && <pre>{props.comment}</pre>}
      {!props.noDelete && (
        <>
          <span>Utworzono: {dateParser(props.createdAt)}</span>
          {props.updatedAt && props.updatedAt !== props.createdAt && (
            <span>Edytowano: {dateParser(props.updatedAt)}</span>
          )}
          <DeleteButton handleClick={handleDelete} />
        </>
      )}
      {daysLeft < 15 && (
        <EventDot
          color={daysLeft < 3 ? "red" : daysLeft < 15 ? "orange" : undefined}
        />
      )}
    </article>
  );
};

export default EventElement;
