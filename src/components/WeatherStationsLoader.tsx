import { useCallback, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import config from "../data/config";
import axios from "axios";
import { ReducerActions } from "../data/enums";

const WeatherStationsLoader = () => {
  let interval: any;
  const { userState, userDispatch } = useUserContext();

  const handleLoadWeatherStations = useCallback(() => {
    console.log("start");
    axios
      .get(config.WEATHER_LINK)
      .then((response: any) => {
        if (response.data.length > 0)
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { weatherStations: response.data },
          });
      })
      .catch((error) => error);
  }, [userState]);

  useEffect(() => {
    handleLoadWeatherStations();
    interval = setInterval(() => handleLoadWeatherStations(), 60000);

    return () => clearInterval(interval);
  }, []);

  return <></>;
};

export default WeatherStationsLoader;
