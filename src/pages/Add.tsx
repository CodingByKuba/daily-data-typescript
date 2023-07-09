import { useParams } from "react-router-dom";
import NoteEditor from "../components/editors/NoteEditor";

const Add = () => {
  const params = useParams();

  return (
    <div>
      {params.type ? (
        <>{params.type === "note" && <NoteEditor id="none" />}</>
      ) : (
        "Dodaj"
      )}
    </div>
  );
};

export default Add;
