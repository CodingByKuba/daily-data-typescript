import { EventType, UserInitialStateType } from "../data/types";

export const eventsSorter = (state: UserInitialStateType): EventType[] =>
  state.events.sort((a: EventType, b: EventType) => (a.time < b.time ? -1 : 1));
