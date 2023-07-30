import { useFetchContext } from "../context/FetchContext";
import { useCallback, useState } from "react";
import { useUserContext } from "../context/UserContext";
import config from "../data/config";
import { useLocalStorageContext } from "../context/LocalStorageContext";
import InfoBox from "../components/InfoBox";
import { ReducerActions } from "../data/enums";

const Settings = () => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();
  const { setMemoryPassword, setPasswordRemember, setAutoLogin } =
    useLocalStorageContext();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const [selectedCity, setSelectedCity] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangePassword = useCallback(() => {
    if (isPending) return;
    setSuccessMessage("");
    setErrorMessage("");
    if (!oldPassword || !newPassword || !repeatNewPassword)
      return setErrorMessage("Nie podano wszystkich potrzebnych haseł");
    if (newPassword !== repeatNewPassword)
      return setErrorMessage("Nowe hasła różnią się od siebie");
    fetchCallback({
      url: config.AX_ROUTE_USERS,
      method: "PUT",
      payload: {
        username: userState.username,
        token: userState.token,
        oldPassword: oldPassword,
        password: newPassword,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setErrorMessage(response.data.error);
        setSuccessMessage("Hasło zostało zmienione");
        setMemoryPassword("");
        setPasswordRemember(false);
        setAutoLogin(false);
      },
      errorCallback: (error: any) => {
        setErrorMessage(error.message);
      },
    });
  }, [userState, oldPassword, newPassword, repeatNewPassword]);

  const handleChangeWeatherCity = useCallback(() => {
    if (isPending) return;
    setSuccessMessage("");
    setErrorMessage("");
    if (selectedCity === "null") return setErrorMessage("Nie wybrano miasta");
    console.log(selectedCity.length);
    if (selectedCity.length !== 5)
      return setErrorMessage("Podano nieprawidłowe miasto");
    setSuccessMessage("");
    setErrorMessage("");
    fetchCallback({
      url: config.AX_ROUTE_USERS,
      method: "PUT",
      payload: {
        username: userState.username,
        token: userState.token,
        weatherCity: parseInt(selectedCity),
      },
      successCallback: (response: any) => {
        if (response.data.error) return setErrorMessage(response.data.error);
        setSuccessMessage("Stacja pogodowa została zmieniona");
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { weatherCity: response.data.weatherCity },
        });
      },
      errorCallback: (error: any) => {
        setErrorMessage(error.message);
      },
    });
  }, [userState, selectedCity]);

  return (
    <section>
      {successMessage && <InfoBox type="success" message={successMessage} />}
      {errorMessage && <InfoBox type="error" message={errorMessage} />}
      <article className="flex-display no-padding">
        Zmiana hasła:
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleChangePassword();
          }}
        >
          <input
            type="password"
            placeholder="Stare hasło..."
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nowe hasło..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Powtórz nowe hasło..."
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
          />
          <button type="submit">Zmień</button>
        </form>
      </article>
      {userState.weatherStations.length > 0 && (
        <article className="flex-display no-padding">
          Stacja pogodowa:
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleChangeWeatherCity();
            }}
          >
            <select
              defaultValue={userState.weatherCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="null">Wybierz stację pogodową...</option>
              {userState.weatherStations.map((el: any) => (
                <option value={el.id_stacji}>{el.stacja}</option>
              ))}
            </select>
            <button type="submit">Zapisz</button>
          </form>
        </article>
      )}
    </section>
  );
};

export default Settings;
