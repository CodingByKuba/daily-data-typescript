import { useUserContext } from "../context/UserContext";
import {
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkPersonFill,
  BsFillCalendar2PlusFill,
  BsFillCreditCard2FrontFill,
} from "react-icons/bs";
import { ContactType } from "../data/types";

const BoardDataCounter = () => {
  const { userState } = useUserContext();

  return (
    <div id="data-counter">
      <div>
        <BsFillFileEarmarkFontFill />
        <p>Notatki</p>
        <span>{userState.notes.length}</span>
      </div>
      <div>
        <BsFillFileEarmarkPersonFill />
        <p>Kontakty</p>
        <span>{userState.contacts.length}</span>
      </div>
      <div>
        <BsFillCalendar2PlusFill />
        <p>Wydarzenia</p>
        <span>{userState.events.length}</span>
      </div>
      <div>
        <BsFillCreditCard2FrontFill />
        <p>Zadłużenia</p>
        <span>
          {userState.contacts.reduce(
            (total: number, current: ContactType) =>
              total + current.debt.length,
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default BoardDataCounter;
