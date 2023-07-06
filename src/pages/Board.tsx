import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import { eventsSorter } from "../utils/dataSorters";

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
          <span>{userState.events[0].title}</span>
        </>
      )}
    </div>
  );
};

export default Board;
