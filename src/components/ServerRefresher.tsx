import axios from "axios";
import { useEffect } from "react";
import config from "../data/config";

type PropsType = {
  children?: React.ReactNode;
};

const ServerRefresher = ({ children }: PropsType) => {
  let interval: any;
  let controller = new AbortController();

  useEffect(() => {
    interval = setInterval(() => {
      axios({
        url: config.AX_BASE_URL + config.AX_CHECK_ALIVE,
        method: "GET",
        timeout: 5000,
        signal: controller.signal,
      })
        .then(() => null)
        .catch(() => null);
    }, 10000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return <>{children}</>;
};

export default ServerRefresher;
