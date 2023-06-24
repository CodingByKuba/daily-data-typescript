import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";

const App = () => {
  return (
    <UserContextProvider>
      <FetchContextProvider>
        <Login />
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
