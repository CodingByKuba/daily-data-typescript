import { createContext, useContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";
import { userInitialState } from "../data/initialState";
import { UserProviderType } from "../data/types";

const defaultValue: any = userInitialState;

const UserContext = createContext(defaultValue);

export const UserContextProvider: React.FC<UserProviderType> = ({
  children,
}) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
