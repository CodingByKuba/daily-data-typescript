import { NavLink, useParams } from "react-router-dom";
import NoteEditor from "../components/editors/NoteEditor";
import {
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkPersonFill,
  BsFillCalendar2PlusFill,
  BsFillCreditCard2FrontFill,
} from "react-icons/bs";
import EventEditor from "../components/editors/EventEditor";
import ContactEditor from "../components/editors/ContactEditor";
import DebtEditor from "../components/editors/DebtEditor";

const Add = () => {
  const params = useParams();

  if (params.type === "note") return <NoteEditor id="none" />;
  if (params.type === "contact") return <ContactEditor id="none" />;
  if (params.type === "event") return <EventEditor id="none" />;
  if (params.type === "debt") return <DebtEditor id="none" user="none" />;

  return (
    <div className="add">
      <NavLink to="/add/note">
        <BsFillFileEarmarkFontFill size={30} />
      </NavLink>
      <NavLink to="/add/contact">
        <BsFillFileEarmarkPersonFill size={30} />
      </NavLink>
      <NavLink to="/add/event">
        <BsFillCalendar2PlusFill size={30} />
      </NavLink>
      <NavLink to="/add/debt">
        <BsFillCreditCard2FrontFill size={30} />
      </NavLink>
    </div>
  );
};

export default Add;
