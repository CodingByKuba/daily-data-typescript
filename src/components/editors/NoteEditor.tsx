import { useEffect, useState } from "react";
import { NoteType } from "../../data/types";
import { useUserContext } from "../../context/UserContext";
import config from "../../data/config";
import { ReducerActions } from "../../data/enums";
import { useFetchContext } from "../../context/FetchContext";
import InfoBox from "../InfoBox";
import Loader from "../Loader";

const NoteEditor = (props: Pick<NoteType, "id"> | undefined) => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [noteFinded, setNoteFinded] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");

  const [fetchSuccess, setFetchSuccess] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");

  const handleSubmit = () => {
    setFetchSuccess("");
    setFetchError("");
    fetchCallback({
      url: config.AX_ROUTE_NOTES,
      method: props?.id ? "PUT" : "POST",
      payload: {
        username: userState.username,
        token: userState.token,
        id: props?.id,
        title: noteTitle,
        content: noteContent,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setFetchError(response.data.error);
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { notes: response.data.notes },
        });
        setFetchSuccess(
          "Notatka została " + (noteFinded ? "edytowana" : "dodana")
        );
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    if (props?.id !== "none") {
      let findNote: NoteType = userState.notes.find(
        (el: NoteType) => el.id === props?.id
      );
      if (findNote.id) {
        setNoteTitle(findNote.title);
        setNoteContent(findNote.content);
      }
    }
    setNoteFinded(true);
  }, []);

  if (!noteFinded) return <div>Nie znaleziono notatki</div>;

  return (
    <>
      {fetchError && <InfoBox type="error" message={fetchError} />}
      {fetchSuccess && <InfoBox type="success" message={fetchSuccess} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>Tytuł notatki:</p>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <p>Treść:</p>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        {isPending ? (
          <Loader />
        ) : (
          <button type="submit">{props?.id ? "Edytuj" : "Dodaj"}</button>
        )}
      </form>
    </>
  );
};

export default NoteEditor;
