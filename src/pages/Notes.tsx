import { useParams } from "react-router-dom";
import NoteList from "../components/lists/NoteList";
import NoteEditor from "../components/editors/NoteEditor";

const Notes = () => {
  const params = useParams();

  return <>{params.id ? <NoteEditor id={params.id} /> : <NoteList />}</>;
};

export default Notes;
