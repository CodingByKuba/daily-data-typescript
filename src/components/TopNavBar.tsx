import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import config from "../data/config";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";

const TopNavBar = () => {
  const { userDispatch } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

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
          <AiOutlineMenu size={20} />
        </button>
      </div>
      <div className="title">{config.LOCATION_NAMES[location.pathname]}</div>
      <div className="logout">
        <button
          onClick={() => {
            navigate("/", {
              replace: true,
            });
            userDispatch({ type: ReducerActions.ON_LOGOUT });
          }}
        >
          <AiOutlineLogout size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
