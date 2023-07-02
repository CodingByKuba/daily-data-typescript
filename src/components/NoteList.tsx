import { useUserContext } from "../context/UserContext";
import { NoteType } from "../data/types";
import InfoBox from "./InfoBox";

const NoteList = () => {
  const { userState } = useUserContext();

  if (userState.notes.length === 0)
    return <InfoBox type="info" message="Brak notatek" />;

  return (
    <>
      {userState.notes.map((el: NoteType, index: number) => (
        <div key={index}>
          <div>{el.title}</div>
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
            {el.content}
          </pre>
        </div>
      ))}
    </>
  );
};

export default NoteList;
