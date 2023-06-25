import { useUserContext } from "../context/UserContext";
import { eventsSorter } from "../utils/dataSorters";

const Board = () => {
  const { userState } = useUserContext();
  const sortedEvents = eventsSorter(userState);

  return (
    <div id="board">
      <h1>Witaj {userState.username}</h1>
      {userState.events.length > 0 && (
        <>
          <p>Najbliższe wydarzenie:</p>
          <span>{sortedEvents[0].title}</span>
        </>
      )}
    </div>
  );
};

export default Board;
