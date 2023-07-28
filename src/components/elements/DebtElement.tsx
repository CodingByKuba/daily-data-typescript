import { NavLink } from "react-router-dom";
import { DebtType } from "../../data/types";
import dateParser from "../../utils/dateParser";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";

const DebtElement = (props: DebtType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDelete = () => {
    if (
      confirm(
        'Czy chcesz usunąć zadłużenie kontaktu "' +
          props.username +
          '" na kwotę ' +
          props.count +
          " zł?"
      )
    ) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_DEBT,
        method: "DELETE",
        payload: {
          username: userState.username,
          token: userState.token,
          id: props.username,
          debtId: props.id,
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
      <NavLink to={props.username + "/" + props.id}>{props.count} zł</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      <p>
        {props.my ? "Masz do oddania " : props.username + " ma do oddania "}
        {props.count} zł
      </p>
      <p>Pożyczono: {dateParser(props.time)}</p>
      {props.comment && <pre>{props.comment}</pre>}
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && <span>Edytowano: {dateParser(props.updatedAt)}</span>}
      <div className="delete">
        <button onClick={handleDelete}>Usuń</button>
      </div>
    </article>
  );
};

export default DebtElement;
