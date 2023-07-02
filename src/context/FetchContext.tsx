import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../data/config";
import {
  FetchContextType,
  FetchProviderType,
  FetchCallbackArguments,
} from "../data/types";

const defaultValue: FetchContextType = {
  isPending: false,
  fetchCallback: () => {},
};

const FetchContext = createContext(defaultValue);

export const FetchContextProvider: React.FC<FetchProviderType> = ({
  children,
}) => {
  const [isPending, setIsPending] = useState(false);
  const controller = new AbortController();

  useEffect(() => () => controller.abort(), []);

  const fetchCallback = (data: FetchCallbackArguments) => {
    if (isPending) return;
    setIsPending(true);
    axios({
      url: config.AX_BASE_URL + (data.url || ""),
      method: data.method || "POST",
      timeout: data.timeout || 5000,
      data: data.payload || {},
      signal: controller.signal,
    })
      .then((response) => {
        data.successCallback(response);
      })
      .catch((error) => data.errorCallback(error))
      .finally(() => setIsPending(false));
  };

  return (
    <FetchContext.Provider
      value={{
        isPending,
        fetchCallback,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => useContext(FetchContext);
