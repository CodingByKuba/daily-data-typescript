import { useParams } from "react-router-dom";
import NoteList from "../components/lists/NoteList";

const Notes = () => {
  const params = useParams();

  return <div>{params.id ? "Notatka " + params.id : <NoteList />}</div>;
};

export default Notes;
