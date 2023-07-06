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
import Add from "./Add";
import Settings from "./Settings";
import Edit from "./Edit";
import { useFetchContext } from "../context/FetchContext";
import FullPageLoader from "../components/FullPageLoader";

const Main = () => {
  const { userState } = useUserContext();
  const { isPending } = useFetchContext();

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
              <Route path="/notes/:id" element={<Notes />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<Contacts />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<Events />} />
              <Route path="/debt" element={<Debt />} />
              <Route path="/add" element={<Add />} />
              <Route path="/add/:type" element={<Add />} />
              <Route path="/edit/:type/:id" element={<Edit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<div>Error</div>} />
            </Routes>
          </main>
          <NavigationDrawer />
          {isPending ? <FullPageLoader /> : null}
        </BrowserRouter>
      </DataLoader>
    </ServerRefresher>
  );
};

export default Main;
