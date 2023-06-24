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
        username: action.payload.username || "",
        token: action.payload.token || "",
        contacts: action.payload.contacts || [],
        notes: action.payload.notes || [],
        events: action.payload.events || [],
        weatherCity: action.payload.weatherCity || null,
      };
    case ReducerActions.ON_LOGOUT:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
