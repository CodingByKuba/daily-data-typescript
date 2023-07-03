import { UserEventType, UserInitialStateType } from "../data/types";

export const eventsSorter = (state: UserInitialStateType): UserEventType[] =>
  state.events.sort((a: UserEventType, b: UserEventType) =>
    a.time < b.time ? -1 : 1
  );
