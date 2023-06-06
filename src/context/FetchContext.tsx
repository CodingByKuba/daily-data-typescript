import axios from "axios";
import { createContext, useContext, useState } from "react";
import config from "../data/config";

type FetchContextType = {
  isPending: any;
  fetchCallback: (arg?: any) => void;
};

type FetchProviderType = {
  children?: React.ReactNode;
};

const defaultValue: FetchContextType = {
  isPending: false,
  fetchCallback: () => {},
};

type FetchCallbackArguments = {
  url: string;
  method: string;
  timeout: number;
  payload: any;
  successCallback: (arg: any) => void;
  errorCallback: (arg: any) => void;
};

const FetchContext = createContext(defaultValue);

export const FetchContextProvider: React.FC<FetchProviderType> = ({
  children,
}) => {
  const [isPending, setIsPending] = useState(false);

  const fetchCallback = (data: FetchCallbackArguments) => {
    if (isPending) return;
    setIsPending(true);
    axios({
      url: config.AX_BASE_URL + (data.url || ""),
      method: data.method || "POST",
      timeout: data.timeout || 5000,
      data: data.payload || {},
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
