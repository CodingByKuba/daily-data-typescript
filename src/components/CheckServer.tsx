import { useFetchContext } from "../context/FetchContext";
import { useUserContext } from "../context/UserContext";
import Loader from "./Loader";
import config from "../data/config";
import { ReducerActions } from "../data/enums";
import { useCallback, useEffect, useState } from "react";

const CheckServer = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { isPending, fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();

  useEffect(() => {
    handleCheckServerAlive();
  }, []);

  const handleCheckServerAlive = useCallback(() => {
    if (isPending) return;
    setIsLoaded(false);
    fetchCallback({
      url: config.AX_CHECK_ALIVE,
      method: "GET",
      timeout: 10000,
      successCallback: (response: any) => {
        setIsLoaded(true);
        if (response.data.server)
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { serverAlive: true },
          });
      },
      errorCallback: (error: any) => {
        setIsLoaded(true);
        return error;
      },
    });
  }, [userState.serverAlive, isLoaded]);

  return (
    <div className="center-flex">
      {isPending || !isLoaded ? (
        <>
          <p>Łączenie z serwerem...</p>
          <Loader />
        </>
      ) : (
        <>
          <p>Serwer nie odpowiada...</p>
          <button onClick={handleCheckServerAlive}>Spróbuj ponownie</button>
        </>
      )}
    </div>
  );
};

export default CheckServer;
