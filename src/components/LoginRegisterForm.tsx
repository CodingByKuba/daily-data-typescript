import { useState } from "react";
import { useFetchContext } from "../context/FetchContext";

import config from "../data/config";
import { InfoBoxMode } from "../data/types";

import Loader from "./Loader";
import InfoBox from "./InfoBox";

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [infoBoxMessage, setInfoBoxMessage] = useState<string>("");
  const [infoBoxType, setInfoBoxType] = useState<InfoBoxMode>("success");

  const { isPending, fetchCallback } = useFetchContext();

  const handleSubmit = () => {
    setInfoBoxMessage("");
    fetchCallback({
      url: isLogin ? config.AX_ROUTE_LOGIN : config.AX_ROUTE_USERS,
      payload: {
        username: login,
        password: password,
      },
      successCallback: (response: any) => {
        if (response.data.error) {
          setInfoBoxMessage(response.data.error);
          setInfoBoxType("error");
          return;
        }
        if (response.data.username) {
          setInfoBoxMessage("Konto założone pomyślnie");
          setInfoBoxType("success");
          return;
        }
        if (response.data.token) {
          setInfoBoxMessage("Zalogowano poprawnie");
          setInfoBoxType("success");
          return;
        }
      },
      errorCallback: (error: any) => {
        setInfoBoxMessage(error.message);
        setInfoBoxType("error");
        return;
      },
    });
  };

  return (
    <form
      id="log-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2>{isLogin ? "Logowanie" : "Rejestracja"}</h2>
      <input
        id="login"
        value={login}
        placeholder="Login..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLogin(e.target.value)
        }
      />
      <input
        id="password"
        value={password}
        type="password"
        placeholder="Hasło..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      {infoBoxMessage && (
        <InfoBox message={infoBoxMessage} type={infoBoxType} />
      )}
      {isPending ? (
        <Loader />
      ) : (
        <>
          <button type="submit">{isLogin ? "Zaloguj" : "Zarejestruj"}</button>
          <a
            href="javascript:void(0);"
            onClick={() => {
              setIsLogin((prevIsLogin: boolean) => !prevIsLogin);
              setLogin("");
              setPassword("");
              setInfoBoxMessage("");
            }}
          >
            {isLogin
              ? "Nie masz konta? Zarejestruj się"
              : "Powrót do logowania"}
          </a>
        </>
      )}
    </form>
  );
};

export default LoginRegisterForm;
