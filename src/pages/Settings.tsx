import { useFetchContext } from "../context/FetchContext";
import { useCallback, useState } from "react";
import { useUserContext } from "../context/UserContext";
import config from "../data/config";
import { useLocalStorageContext } from "../context/LocalStorageContext";
import InfoBox from "../components/InfoBox";

const Settings = () => {
  const { userState } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();
  const { setMemoryPassword, setPasswordRemember, setAutoLogin } =
    useLocalStorageContext();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

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
    </section>
  );
};

export default Settings;
