import DataLoader from "../components/DataLoader";
import { useUserContext } from "../context/UserContext";
import Board from "./Board";
import Login from "./Login";

const Main = () => {
  const { userState } = useUserContext();

  if (!userState.username && !userState.token) return <Login />;

  return (
    <DataLoader>
      <Board />
    </DataLoader>
  );
};

export default Main;
