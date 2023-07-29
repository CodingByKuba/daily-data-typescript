import { useEffect, useState } from "react";
import { ContactType, DebtType } from "../../data/types";
import { useUserContext } from "../../context/UserContext";
import config from "../../data/config";
import { ReducerActions } from "../../data/enums";
import { useFetchContext } from "../../context/FetchContext";
import InfoBox from "../InfoBox";
import Loader from "../Loader";
import { inputDateParser, inputTimeParser } from "../../utils/inputDateParsers";

type PropsType = {
  id: string;
  user: string;
};

const DebtEditor = (props: PropsType) => {
  let newDate = new Date();

  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [debtFinded, setDebtFinded] = useState<boolean>(false);
  const [userFinded, setUserFinded] = useState<boolean>(false);
  const [debtContactId, setDebtContactId] = useState<string>(props.user || "");
  const [debtMy, setDebtMy] = useState<boolean>(false);
  const [debtCount, setDebtCount] = useState<string>("");
  const [debtComment, setDebtComment] = useState<string>("");
  const [debtTime, setDebtTime] = useState<Date>(newDate);

  const [date, setDate] = useState<string>(inputDateParser(newDate));
  const [time, setTime] = useState<string>(inputTimeParser(newDate));

  const [fetchSuccess, setFetchSuccess] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    setDebtTime(new Date(date + " " + time));
  }, [date, time]);

  const handleSubmit = () => {
    setFetchSuccess("");
    setFetchError("");
    fetchCallback({
      url: config.AX_ROUTE_DEBT,
      method: props.id !== "none" ? "PUT" : "POST",
      payload: {
        username: userState.username,
        token: userState.token,
        id: debtContactId,
        debtId: props.id,
        my: debtMy || "none",
        count: debtCount,
        comment: debtComment,
        time: debtTime,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setFetchError(response.data.error);
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { contacts: response.data.contacts },
        });
        setFetchSuccess(
          "Zadłużenie zostało " + (props.id !== "none" ? "edytowane" : "dodane")
        );
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    if (props.id !== "none" && props.user !== "none") {
      let findContact: number = userState.contacts.findIndex(
        (el: ContactType) => el.id === props.user
      );
      if (findContact === -1) return;
      setUserFinded(true);
      let findDebt: DebtType = userState.contacts[findContact].debt.find(
        (el: DebtType) => el.id === props.id
      );
      if (findDebt.id) {
        setDebtMy(findDebt.my);
        setDebtCount(findDebt.count.toString());
        setDebtComment(findDebt.comment);
        setDebtTime(new Date(findDebt.time));
        setDebtFinded(true);
      }
    }
  }, []);

  if (!userFinded && props.id !== "none")
    return <div>Nie znaleziono użytkownika</div>;

  if (!debtFinded && props.id !== "none")
    return <div>Nie znaleziono zadłużenia</div>;

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
        <select
          defaultValue={props.user}
          disabled={userFinded ? true : false}
          onChange={(e) => setDebtContactId(e.target.value)}
        >
          <option value="none">Wybierz kontakt...</option>
          {userState.contacts.map((el: ContactType) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Kwota..."
          value={debtCount}
          onChange={(e) => setDebtCount(e.target.value)}
        />
        <div className={debtMy ? "red" : "green"}>
          <input
            type="checkbox"
            checked={debtMy}
            onChange={() => setDebtMy((prevDebtMy) => !prevDebtMy)}
          />
          {debtMy ? "Mój dług wobec kontaktu" : "Dług kontaktu wobec mnie"}
        </div>

        <textarea
          value={debtComment}
          onChange={(e) => setDebtComment(e.target.value)}
        />

        <input
          type="date"
          value={inputDateParser(debtTime)}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={inputTimeParser(debtTime)}
          onChange={(e) => setTime(e.target.value)}
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

export default DebtEditor;
