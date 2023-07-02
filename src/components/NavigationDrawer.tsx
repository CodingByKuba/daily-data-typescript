import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

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
      <button onClick={() => closeAction()}>x</button>
      Menu:
      <NavLink to="/" onClick={() => closeAction()}>
        Główna
      </NavLink>
      <NavLink to="notes" onClick={() => closeAction()}>
        Notatki
      </NavLink>
      <NavLink to="contacts" onClick={() => closeAction()}>
        Kontakty
      </NavLink>
      <NavLink to="events" onClick={() => closeAction()}>
        Wydarzenia
      </NavLink>
      <NavLink to="debt" onClick={() => closeAction()}>
        Zadłużenia
      </NavLink>
      <hr />
      <NavLink to="add" onClick={() => closeAction()}>
        Dodaj
      </NavLink>
      <NavLink to="settings" onClick={() => closeAction()}>
        Ustawienia
      </NavLink>
    </nav>
  );
};

export default NavigationDrawer;
