import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

const NavigationDrawer = () => {
  const { userState, userDispatch } = useUserContext();
  return (
    <nav className={"nav " + userState.navigationOpened.toString()}>
      <button
        onClick={() =>
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { navigationOpened: false },
          })
        }
      >
        x
      </button>
      <hr />
    </nav>
  );
};

export default NavigationDrawer;
