import { useUserContext } from "../../context/UserContext";
import { NoteType } from "../../data/types";
import { notesSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import SearchBar from "../SearchBar";
import Note from "../elements/NoteElement";
import { useState, useCallback } from "react";

const NoteList = () => {
  const { userState } = useUserContext();
  const [searchString, setSearchString] = useState<string>("");

  const sortedNotes: NoteType[] =
    userState.notes.length > 0
      ? notesSorter(userState).filter(
          (el) =>
            el.title?.toUpperCase().includes(searchString.toUpperCase()) ||
            el.content?.toUpperCase().includes(searchString.toUpperCase())
        )
      : [];

  const handleChangeSearch = useCallback(
    (e: any) => {
      setSearchString(e.target.value);
    },
    [searchString]
  );

  return (
    <>
      <div id="separator"></div>
      <SearchBar value={searchString} onChange={handleChangeSearch} />
      {sortedNotes.length === 0 ? (
        <InfoBox type="info" message="Brak notatek" />
      ) : (
        sortedNotes.map((el: NoteType) => (
          <Note
            key={el.id}
            id={el.id}
            title={el.title}
            content={el.content}
            createdAt={el.createdAt}
            updatedAt={el?.updatedAt || undefined}
          />
        ))
      )}
    </>
  );
};

export default NoteList;
