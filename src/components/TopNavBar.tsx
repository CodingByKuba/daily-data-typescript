import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import config from "../data/config";

const TopNavBar = () => {
  const { userDispatch } = useUserContext();
  const location = useLocation();

  return (
    <header id="top-nav-bar">
      <div className="menu">
        <button
          onClick={() =>
            userDispatch({
              type: ReducerActions.SET_DATA,
              payload: { navigationOpened: true },
            })
          }
        >
          Menu
        </button>
      </div>
      <div className="title">{config.LOCATION_NAMES[location.pathname]}</div>
      <div className="logout">
        <button
          onClick={() => userDispatch({ type: ReducerActions.ON_LOGOUT })}
        >
          Wyloguj
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
