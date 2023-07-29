import { useCallback, useState, useEffect } from "react";
import { useFetchContext } from "../context/FetchContext";

import config from "../data/config";

import Loader from "./Loader";
import InfoBox from "./InfoBox";
import { useUserContext } from "../context/UserContext";
import { InfoBoxMode } from "../data/types";
import { ReducerActions } from "../data/enums";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [infoBoxMessage, setInfoBoxMessage] = useState<string>("");
  const [infoBoxType, setInfoBoxType] = useState<InfoBoxMode>("success");

  const { userDispatch } = useUserContext();

  const { isPending, fetchCallback } = useFetchContext();
  const {
    memoryLogin,
    memoryPassword,
    passwordRemember,
    autoLogin,
    setMemoryLogin,
    setMemoryPassword,
    setPasswordRemember,
    setAutoLogin,
  } = useLocalStorageContext();

  useEffect(() => {
    if (!passwordRemember) return;
    if (memoryLogin) setLogin(memoryLogin);
    if (memoryPassword) setPassword(memoryPassword);

    if (autoLogin) {
      handleSubmit(memoryLogin, memoryPassword);
    }
  }, []);

  const handleSubmit = useCallback(
    (argLogin: string, argPassword: string) => {
      setInfoBoxMessage("");
      fetchCallback({
        url: isLogin ? config.AX_ROUTE_LOGIN : config.AX_ROUTE_USERS,
        payload: {
          username: argLogin,
          password: argPassword,
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
            if (passwordRemember && login.length > 0 && password.length > 0) {
              setMemoryLogin(login);
              setMemoryPassword(password);
            }
            userDispatch({
              type: ReducerActions.SET_DATA,
              payload: {
                username: login || memoryLogin,
                token: response.data.token,
              },
            });
            return;
          }
        },
        errorCallback: (error: any) => {
          setInfoBoxMessage(error.message);
          setInfoBoxType("error");
          return;
        },
      });
    },
    [login, password]
  );

  return (
    <form
      id="log-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(login, password);
      }}
    >
      <h2>{isLogin ? "Logowanie" : "Rejestracja"}</h2>
      <input
        id="login"
        value={login}
        placeholder="Login..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLogin(e.target.value);
        }}
      />
      <input
        id="password"
        value={password}
        type="password"
        placeholder="Hasło..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      {isLogin && (
        <>
          <div>
            <input
              type="checkbox"
              checked={passwordRemember}
              onChange={(e) => {
                if (autoLogin) setAutoLogin(false);
                setPasswordRemember(e.target.checked);
              }}
            />
            Zapamiętaj hasło
          </div>
          {passwordRemember && (
            <div>
              <input
                type="checkbox"
                checked={autoLogin}
                disabled={!passwordRemember}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              Zaloguj automatycznie
            </div>
          )}
        </>
      )}

      {infoBoxMessage && (
        <InfoBox message={infoBoxMessage} type={infoBoxType} />
      )}
      {isPending ? (
        <Loader />
      ) : (
        <>
          <button type="submit">{isLogin ? "Zaloguj" : "Zarejestruj"}</button>
          <a
            href="/"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setIsLogin((prevIsLogin: boolean) => !prevIsLogin);
              if (isLogin) {
                setLogin("");
                setPassword("");
              } else {
                if (passwordRemember) {
                  setLogin(memoryLogin);
                  setPassword(memoryPassword);
                } else {
                  setLogin("");
                  setPassword("");
                }
              }

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
