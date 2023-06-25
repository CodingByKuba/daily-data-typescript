import { UserInitialStateType } from "./types";

export const userInitialState: UserInitialStateType = {
  dataLoaded: false,
  username: "",
  token: "",
  contacts: [],
  notes: [],
  events: [],
  weatherCity: null,
};
