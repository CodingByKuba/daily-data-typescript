import { createContext, useContext } from "react";
import { UserProviderType } from "../data/types";
import useLocalStorage from "../hooks/useLocalStorage";
import config from "../data/config";

const defaultValue: any = {
  login: "",
  password: "",
  passwordRemember: false,
  autoLogin: false,
  setLogin: () => {},
  setPassword: () => {},
  setPasswordRemember: () => {},
  setAutoLogin: () => {},
};

const LocalStorageContext = createContext(defaultValue);

export const LocalStorageContextProvider: React.FC<UserProviderType> = ({
  children,
}) => {
  const [memoryLogin, setMemoryLogin] = useLocalStorage(
    config.MEMORY_SLOTS.login,
    ""
  );
  const [memoryPassword, setMemoryPassword] = useLocalStorage(
    config.MEMORY_SLOTS.password,
    ""
  );
  const [passwordRemember, setPasswordRemember] = useLocalStorage(
    config.MEMORY_SLOTS.passwordRemember,
    false
  );
  const [autoLogin, setAutoLogin] = useLocalStorage(
    config.MEMORY_SLOTS.autoLogin,
    false
  );

  return (
    <LocalStorageContext.Provider
      value={{
        memoryLogin,
        memoryPassword,
        passwordRemember,
        autoLogin,
        setMemoryLogin,
        setMemoryPassword,
        setPasswordRemember,
        setAutoLogin,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = () => useContext(LocalStorageContext);
