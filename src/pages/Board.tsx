import { useUserContext } from "../context/UserContext";
import { eventsSorter } from "../utils/dataSorters";
import Event from "../components/elements/EventElement";
import { ContactType, EventType } from "../data/types";
import { BsTag, BsThermometerSun, BsWind } from "react-icons/bs";
import { WiHumidity, WiDirectionDown } from "react-icons/wi";
import { useState, useEffect } from "react";
import BoardCalendar from "../components/BoardCalendar";
import BoardDataCounter from "../components/BoardDataCounter";
import { NavLink } from "react-router-dom";
import config from "../data/config";
import { useFetchContext } from "../context/FetchContext";
import { ReducerActions } from "../data/enums";

const Board = () => {
  let interval: any;
  const { userState, userDispatch } = useUserContext();
  const { fetchCallback } = useFetchContext();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const handleClearShoppingList = () => {
    if (confirm("Czy chcesz wyczyścić listę zakupów?")) {
      fetchCallback({
        url: config.AX_ROUTE_SHOPPINGLIST,
        method: "DELETE",
        payload: {
          username: userState.username,
          token: userState.token,
          clear: true,
        },
        successCallback: (response: any) => {
          if (response.data.error) return;
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { shoppingList: response.data.shoppingList },
          });
        },
        errorCallback: (error: any) => error,
      });
    }
  };

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
      <article className="no-padding" id="board-head">
        <BoardCalendar date={currentDate} />
        <BoardDataCounter />
      </article>
      {firstEvent && (
        <Event
          id={firstEvent.id}
          title={firstEvent.title}
          comment={firstEvent.comment}
          time={firstEvent.time}
          createdAt={firstEvent.createdAt}
          updatedAt={firstEvent.updatedAt}
          noDelete
        />
      )}
      {userState.weatherStations.length > 0 && currentStation && (
        <article className="no-padding">
          <NavLink to="/settings">Pogoda</NavLink>
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
      {userState.shoppingList.length > 0 ? (
        <article>
          <NavLink to="/shopping-list">Zakupy</NavLink>
          <pre>
            {userState.shoppingList.map((el: any) => {
              let currentProduct = userState.products.find(
                (element: any) => element.id === el.productId
              );

              return (
                currentProduct.title +
                (el.count !== 1
                  ? " (" + el.count + currentProduct.unit + "), "
                  : ", ")
              );
            })}
          </pre>
          <div>
            <NavLink to="/products">
              <button>&nbsp;+&nbsp;</button>
            </NavLink>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  userState.shoppingList.map((el: any) => {
                    let currentProduct = userState.products.find(
                      (element: any) => element.id === el.productId
                    );

                    return (
                      " " +
                      currentProduct.title +
                      (el.count !== 1
                        ? " (" + el.count + currentProduct.unit + ")"
                        : "")
                    );
                  })
                )
              }
            >
              Kopiuj
            </button>
            <button onClick={handleClearShoppingList}>Czyść</button>
          </div>
        </article>
      ) : null}
      {debtCount !== 0 && (
        <article>
          <NavLink to="/debt">Bilans zadłużeń</NavLink>
          <pre className={debtCount < 0 ? "red" : "green"}>{debtCount} zł</pre>
        </article>
      )}
    </div>
  );
};

export default Board;
