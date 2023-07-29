import { useUserContext } from "../../context/UserContext";
import { EventType } from "../../data/types";
import { eventsSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import Event from "../elements/EventElement";

const EventList = () => {
  const { userState } = useUserContext();

  const sortedEvents: EventType[] =
    userState.events.length > 0 ? eventsSorter(userState) : [];

  if (sortedEvents.length === 0)
    return <InfoBox type="info" message="Brak wydarzeń" />;

  return (
    <>
      {sortedEvents.map((el: EventType) => (
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
