import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

const TopNavBar = () => {
  const { userDispatch } = useUserContext();
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
      <div className="title">title</div>
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
