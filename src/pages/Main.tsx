import { useUserContext } from "../context/UserContext";
import Login from "./Login";

const Main = () => {
  const { userState } = useUserContext();

  if (!userState.username && !userState.token) return <Login />;

  return <div>Zalogowany</div>;
};

export default Main;
