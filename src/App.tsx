import { FetchContextProvider } from "./context/FetchContext";
import Login from "./pages/Login";

const App = () => {
  return (
    <FetchContextProvider>
      <Login />
    </FetchContextProvider>
  );
};

export default App;
