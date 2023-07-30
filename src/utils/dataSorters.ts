import {
  ContactType,
  EventType,
  NoteType,
  UserInitialStateType,
} from "../data/types";

export const eventsSorter = (state: UserInitialStateType): EventType[] =>
  state.events.sort((a: EventType, b: EventType) => (a.time < b.time ? -1 : 1));

export const contactsSorter = (state: UserInitialStateType): ContactType[] =>
  state.contacts.sort((a: ContactType, b: ContactType) =>
    a.name > b.name ? 1 : -1
  );

export const notesSorter = (state: UserInitialStateType): NoteType[] =>
  state.notes.sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1));
