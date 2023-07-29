import { FetchContextProvider } from "./context/FetchContext";
import { LocalStorageContextProvider } from "./context/LocalStorageContext";
import { UserContextProvider } from "./context/UserContext";
import Main from "./pages/Main";

const App = () => {
  return (
    <LocalStorageContextProvider>
      <UserContextProvider>
        <FetchContextProvider>
          <Main />
        </FetchContextProvider>
      </UserContextProvider>
    </LocalStorageContextProvider>
  );
};

export default App;
