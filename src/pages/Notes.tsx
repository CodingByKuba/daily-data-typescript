import { useParams } from "react-router-dom";
import NoteList from "../components/lists/NoteList";

const Notes = () => {
  const params = useParams();

  return <>{params.id ? "Notatka " + params.id : <NoteList />}</>;
};

export default Notes;
