import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataLoader from "../components/DataLoader";
import ServerRefresher from "../components/ServerRefresher";
import TopNavBar from "../components/TopNavBar";
import { useUserContext } from "../context/UserContext";
import Board from "./Board";
import Login from "./Login";
import NavigationDrawer from "../components/NavigationDrawer";
import Notes from "./Notes";
import Contacts from "./Contacts";
import Events from "./Events";
import Debt from "./Debt";

const Main = () => {
  const { userState } = useUserContext();

  if (!userState.username && !userState.token) return <Login />;

  return (
    <ServerRefresher>
      <DataLoader>
        <BrowserRouter>
          <TopNavBar />
          <main>
            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/events" element={<Events />} />
              <Route path="/debt" element={<Debt />} />
            </Routes>
          </main>
          <NavigationDrawer />
        </BrowserRouter>
      </DataLoader>
    </ServerRefresher>
  );
};

export default Main;
