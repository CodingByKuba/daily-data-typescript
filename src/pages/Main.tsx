import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataLoader from "../components/DataLoader";
import ServerRefresher from "../components/ServerRefresher";
import TopNavBar from "../components/TopNavBar";
import { useUserContext } from "../context/UserContext";
import Board from "./Board";
import Login from "./Login";
import NavigationDrawer from "../components/NavigationDrawer";

const Main = () => {
  const { userState } = useUserContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Board />,
    },
  ]);

  if (!userState.username && !userState.token) return <Login />;

  return (
    <ServerRefresher>
      <DataLoader>
        <TopNavBar />
        <main>
          <RouterProvider router={router} />
        </main>
        <NavigationDrawer />
      </DataLoader>
    </ServerRefresher>
  );
};

export default Main;
