import { useUserContext } from "../context/UserContext";
import { eventsSorter } from "../utils/dataSorters";
import Event from "../components/elements/EventElement";
import { EventType } from "../data/types";

const Board = () => {
  const { userState } = useUserContext();

  const firstEvent: EventType | undefined =
    userState.events.length > 0 ? eventsSorter(userState)[0] : undefined;

  return (
    <div id="board">
      <h1>Witaj {userState.username}</h1>
      {firstEvent && (
        <>
          <p>Najbliższe wydarzenie:</p>
          <Event
            id={firstEvent.id}
            title={firstEvent.title}
            comment={firstEvent.comment}
            time={firstEvent.time}
            createdAt={firstEvent.createdAt}
            updatedAt={firstEvent.updatedAt}
            noDelete
          />
        </>
      )}
    </div>
  );
};

export default Board;
