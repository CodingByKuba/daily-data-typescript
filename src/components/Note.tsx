import { NavLink } from "react-router-dom";
import { NoteType } from "../data/types";
import dateParser from "../utils/dateParser";
import { useFetchContext } from "../context/FetchContext";
import config from "../data/config";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import InfoBox from "./InfoBox";
import { ReducerActions } from "../data/enums";

const Note = (props: NoteType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDelete = () => {
    if (confirm('Czy chcesz usunąć notatkę "' + props.title + '"?')) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_NOTES,
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
            payload: { notes: response.data.notes },
          });
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  return (
    <article>
      <NavLink to={"/edit/note/" + props.id}>{props.title}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      <pre style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
        {props.content}
      </pre>
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && <span>Edytowano: {dateParser(props.updatedAt)}</span>}
      <div className="delete">
        <button onClick={handleDelete}>Usuń</button>
      </div>
    </article>
  );
};

export default Note;
