import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import config from "../data/config";
import { NavigationLinkType } from "../data/types";
import { AiOutlineCloseCircle } from "react-icons/ai";

const NavigationDrawer = () => {
  const { userState, userDispatch } = useUserContext();

  const closeAction = useCallback(
    () =>
      userDispatch({
        type: ReducerActions.SET_DATA,
        payload: { navigationOpened: false },
      }),
    [userState.navigationOpened]
  );

  return (
    <nav className={"nav " + userState.navigationOpened.toString()}>
      <button onClick={() => closeAction()}>
        <AiOutlineCloseCircle size={20} />
      </button>
      Menu:
      {config.NAVIGATION_LINKS.map((el: NavigationLinkType, index: number) => (
        <NavLink key={index} to={el.url} onClick={() => closeAction()}>
          {el.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationDrawer;
