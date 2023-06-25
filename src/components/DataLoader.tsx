import { useEffect } from "react";
import { useFetchContext } from "../context/FetchContext";
import Loader from "./Loader";
import config from "../data/config";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

type PropsType = {
  children?: React.ReactNode;
};

const DataLoader = ({ children }: PropsType) => {
  const { isPending, fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();

  useEffect(() => {
    fetchCallback({
      url: config.AX_ROUTE_USERS,
      method: "PATCH",
      payload: {
        username: userState.username,
        token: userState.token,
      },
      successCallback: (response: any) => {
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        if (response.data.username === userState.username) {
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: {
              contacts: response.data.contacts,
              notes: response.data.notes,
              events: response.data.events,
              weatherCity: response.data.weatherCity,
            },
          });
          return;
        }
      },
      errorCallback: (error: any) => {
        alert(error.message);
        return;
      },
    });
  }, []);

  return isPending ? <Loader /> : <>{children}</>;
};

export default DataLoader;
