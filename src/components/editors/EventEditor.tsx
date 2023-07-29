import { useEffect, useState } from "react";
import { EventType } from "../../data/types";
import { useUserContext } from "../../context/UserContext";
import config from "../../data/config";
import { ReducerActions } from "../../data/enums";
import { useFetchContext } from "../../context/FetchContext";
import InfoBox from "../InfoBox";
import Loader from "../Loader";
import { inputDateParser, inputTimeParser } from "../../utils/inputDateParsers";

const EventEditor = (props: Pick<EventType, "id">) => {
  let newDate = new Date();

  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [eventFinded, setEventFinded] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventContent, setEventContent] = useState<string>("");
  const [eventTime, setEventTime] = useState<Date>(newDate);

  const [date, setDate] = useState<string>(inputDateParser(newDate));
  const [time, setTime] = useState<string>(inputTimeParser(newDate));

  const [fetchSuccess, setFetchSuccess] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    setEventTime(new Date(date + " " + time));
  }, [date, time]);

  const handleSubmit = () => {
    setFetchSuccess("");
    setFetchError("");
    fetchCallback({
      url: config.AX_ROUTE_EVENTS,
      method: props.id !== "none" ? "PUT" : "POST",
      payload: {
        username: userState.username,
        token: userState.token,
        id: props?.id,
        title: eventTitle,
        comment: eventContent,
        time: eventTime,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setFetchError(response.data.error);
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { events: response.data.events },
        });
        setFetchSuccess(
          "Wydarzenie zostało " + (props.id !== "none" ? "edytowane" : "dodane")
        );
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    if (props.id !== "none") {
      let findEvent: EventType = userState.events.find(
        (el: EventType) => el.id === props.id
      );
      if (findEvent.id) {
        setEventTitle(findEvent.title);
        setEventContent(findEvent.comment);
        setEventTime(new Date(findEvent.time));
        setEventFinded(true);
      }
    }
  }, []);

  if (!eventFinded && props.id !== "none")
    return <div>Nie znaleziono wydarzenia</div>;

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
        <p>Tytuł wydarzenia:</p>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <p>Treść:</p>
        <textarea
          value={eventContent}
          onChange={(e) => setEventContent(e.target.value)}
        />
        <input
          type="date"
          value={inputDateParser(eventTime)}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={inputTimeParser(eventTime)}
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

export default EventEditor;
