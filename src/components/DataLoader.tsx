import { useEffect, useState } from "react";
import { useFetchContext } from "../context/FetchContext";
import Loader from "./Loader";
import config from "../data/config";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import InfoBox from "./InfoBox";

type PropsType = {
  children?: React.ReactNode;
};

const DataLoader = ({ children }: PropsType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [error, setError] = useState<string>("");

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
          setError(response.data.error);
          return;
        }
        if (response.data.username === userState.username) {
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: {
              dataLoaded: true,
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
        setError(error.message);
        return;
      },
    });
  }, []);

  return !userState.dataLoaded || error ? (
    <div className="center-flex">
      {error ? (
        <>
          <InfoBox type="error" message={error} />
          <button
            onClick={() => userDispatch({ type: ReducerActions.ON_LOGOUT })}
          >
            Wyloguj
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    <>{children}</>
  );
};

export default DataLoader;
