import { NavLink } from "react-router-dom";
import { NoteType } from "../data/types";

const Note = (props: NoteType) => {
  return (
    <article>
      <NavLink to={"/edit/note/" + props.id}>{props.title}</NavLink>
      <pre style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
        {props.content}
      </pre>
      <span>Utworzono: {props.createdAt.toString()}</span>
      {props.updatedAt && <span>Edytowano: {props.updatedAt.toString()}</span>}
      <div className="delete">
        <button>Usuń</button>
      </div>
    </article>
  );
};

export default Note;
