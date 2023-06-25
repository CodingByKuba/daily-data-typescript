import { useUserContext } from "../context/UserContext";

const NavigationDrawer = () => {
  const { userState } = useUserContext();
  return (
    <nav className={userState.navigationOpened.toString()}>
      <button>x</button>
      <hr />
    </nav>
  );
};

export default NavigationDrawer;
