import DataLoader from "../components/DataLoader";
import ServerRefresher from "../components/ServerRefresher";
import { useUserContext } from "../context/UserContext";
import Board from "./Board";
import Login from "./Login";

const Main = () => {
  const { userState } = useUserContext();

  if (!userState.username && !userState.token) return <Login />;

  return (
    <ServerRefresher>
      <DataLoader>
        <Board />
      </DataLoader>
    </ServerRefresher>
  );
};

export default Main;
