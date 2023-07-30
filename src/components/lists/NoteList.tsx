import { useUserContext } from "../../context/UserContext";
import { NoteType } from "../../data/types";
import { notesSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import Note from "../elements/NoteElement";

const NoteList = () => {
  const { userState } = useUserContext();

  const sortedNotes: NoteType[] =
    userState.notes.length > 0 ? notesSorter(userState) : [];

  if (sortedNotes.length === 0)
    return <InfoBox type="info" message="Brak notatek" />;

  return (
    <>
      {sortedNotes.map((el: NoteType) => (
        <Note
          key={el.id}
          id={el.id}
          title={el.title}
          content={el.content}
          createdAt={el.createdAt}
          updatedAt={el?.updatedAt || undefined}
        />
      ))}
    </>
  );
};

export default NoteList;
