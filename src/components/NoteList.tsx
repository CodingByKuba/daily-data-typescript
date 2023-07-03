import { useUserContext } from "../context/UserContext";
import { NoteType } from "../data/types";
import InfoBox from "./InfoBox";
import Note from "./Note";

const NoteList = () => {
  const { userState } = useUserContext();

  if (userState.notes.length === 0)
    return <InfoBox type="info" message="Brak notatek" />;

  return (
    <>
      {userState.notes.map((el: NoteType) => (
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
