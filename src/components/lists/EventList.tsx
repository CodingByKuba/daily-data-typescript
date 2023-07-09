import { useUserContext } from "../../context/UserContext";
import { EventType } from "../../data/types";
import InfoBox from "../InfoBox";
import Event from "../elements/EventElement";

const EventList = () => {
  const { userState } = useUserContext();

  if (userState.events.length === 0)
    return <InfoBox type="info" message="Brak kontaktów" />;

  return (
    <>
      {userState.events.map((el: EventType) => (
        <Event
          key={el.id}
          id={el.id}
          title={el.title}
          comment={el.comment}
          time={el.time}
          createdAt={el.createdAt}
          updatedAt={el?.updatedAt || undefined}
        />
      ))}
    </>
  );
};

export default EventList;
