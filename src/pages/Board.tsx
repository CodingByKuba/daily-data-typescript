import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import { eventsSorter } from "../utils/dataSorters";
import Event from "../components/elements/Event";

const Board = () => {
  const { userState, userDispatch } = useUserContext();

  useEffect(() => {
    if (userState.events.length > 0)
      userDispatch({
        type: ReducerActions.SET_DATA,
        payload: { events: eventsSorter(userState) },
      });
  }, []);

  return (
    <div id="board">
      <h1>Witaj {userState.username}</h1>
      {userState.events.length > 0 && (
        <>
          <p>Najbliższe wydarzenie:</p>
          <Event
            id={userState.events[0].id}
            title={userState.events[0].title}
            comment={userState.events[0].comment}
            time={userState.events[0].time}
            createdAt={userState.events[0].createdAt}
            updatedAt={userState.events[0].updatedAt}
          />
        </>
      )}
    </div>
  );
};

export default Board;
