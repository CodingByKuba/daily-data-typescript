import { useUserContext } from "../context/UserContext";
import { eventsSorter } from "../utils/dataSorters";
import Event from "../components/elements/EventElement";
import { ContactType, EventType } from "../data/types";
import { BsTag, BsThermometerSun, BsWind } from "react-icons/bs";
import { WiHumidity, WiDirectionDown } from "react-icons/wi";

const Board = () => {
  const { userState } = useUserContext();

  const firstEvent: EventType | undefined =
    userState.events.length > 0 ? eventsSorter(userState)[0] : undefined;

  const debtCount = userState.contacts.reduce(
    (total: number, current: ContactType) => {
      if (current.debt.length === 0) return total;
      let currentDebtReduce = current.debt.reduce(
        (debtTotal: number, debtCurrent) =>
          debtCurrent.my
            ? debtTotal - debtCurrent.count
            : debtTotal + debtCurrent.count,
        0
      );
      return total + currentDebtReduce;
    },
    0
  );

  const currentStation = userState.weatherStations.find(
    (el: any) => parseInt(el.id_stacji) === userState.weatherCity
  );

  return (
    <div id="board">
      <h1>Witaj {userState.username}</h1>
      {firstEvent && (
        <>
          <p>Najbliższe wydarzenie:</p>
          <Event
            id={firstEvent.id}
            title={firstEvent.title}
            comment={firstEvent.comment}
            time={firstEvent.time}
            createdAt={firstEvent.createdAt}
            updatedAt={firstEvent.updatedAt}
            noDelete
          />
        </>
      )}
      <article>
        <p>Bilans zadłużeń: </p>
        <pre className={debtCount < 0 ? "red" : "green"}>{debtCount} zł</pre>
      </article>
      {userState.weatherStations.length > 0 && currentStation && (
        <article className="no-padding">
          <p>Pogoda:</p>
          <div className="weather-box">
            {currentStation.stacja && (
              <div>
                <BsTag />
                {currentStation.stacja}
              </div>
            )}
            {currentStation.temperatura && (
              <div>
                <BsThermometerSun />
                {currentStation.temperatura} °C
              </div>
            )}
            {currentStation.predkosc_wiatru && (
              <div>
                <BsWind />
                {currentStation.predkosc_wiatru} m/s
              </div>
            )}
            {currentStation.wilgotnosc_wzgledna && (
              <div>
                <WiHumidity />
                {currentStation.wilgotnosc_wzgledna}%
              </div>
            )}
            {currentStation.cisnienie && (
              <div>
                <WiDirectionDown />
                {currentStation.cisnienie} hPa
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

export default Board;
