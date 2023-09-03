import { UserInitialStateType } from "./types";

export const userInitialState: UserInitialStateType = {
  serverAlive: false,
  dataLoaded: false,
  navigationOpened: false,
  username: "",
  token: "",
  contacts: [],
  notes: [],
  events: [],
  weatherCity: null,
  weatherStations: [],
  products: [],
  shoppingList: [],
};
