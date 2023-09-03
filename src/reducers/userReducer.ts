import { ReducerActions } from "../data/enums";
import { userInitialState } from "../data/initialState";
import { ReducerActionType, UserInitialStateType } from "../data/types";

const userReducer = (
  state: UserInitialStateType,
  action: ReducerActionType
) => {
  switch (action.type) {
    case ReducerActions.SET_DATA:
      return {
        ...state,
        serverAlive: action.payload.serverAlive || state.serverAlive,
        dataLoaded: action.payload.dataLoaded || state.dataLoaded,
        navigationOpened: action.payload.navigationOpened || false,
        username: action.payload.username || state.username,
        token: action.payload.token || state.token,
        contacts: action.payload.contacts || state.contacts,
        notes: action.payload.notes || state.notes,
        events: action.payload.events || state.events,
        weatherCity: action.payload.weatherCity || state.weatherCity,
        weatherStations:
          action.payload.weatherStations || state.weatherStations,
        products: action.payload.products || state.products,
        shoppingList: action.payload.shoppingList || state.shoppingList,
      };
    case ReducerActions.ON_LOGOUT:
      return { ...userInitialState, serverAlive: true };
    default:
      return state;
  }
};

export default userReducer;
