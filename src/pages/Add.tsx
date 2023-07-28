import { NavLink, useParams } from "react-router-dom";
import NoteEditor from "../components/editors/NoteEditor";

const Add = () => {
  const params = useParams();

  if (params.type === "note") return <NoteEditor id="none" />;

  return (
    <div className="center-flex">
      <NavLink to="/add/note">Notatka</NavLink>
      <NavLink to="/add/contact">Kontakt</NavLink>
      <NavLink to="/add/event">Wydarzenie</NavLink>
      <NavLink to="/add/debt">Zadłużenie</NavLink>
    </div>
  );
};

export default Add;
