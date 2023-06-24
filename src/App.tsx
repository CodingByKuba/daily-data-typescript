import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";
import Main from "./pages/Main";

const App = () => {
  return (
    <UserContextProvider>
      <FetchContextProvider>
        <Main />
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
