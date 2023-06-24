import { ReducerActions } from "../data/enums";
import { ReducerActionType, UserInitialStateType } from "../data/types";

const userReducer = (
  state: UserInitialStateType,
  action: ReducerActionType
) => {
  switch (action.type) {
    case ReducerActions.SET_USERNAME:
      return { ...state, username: action.payload || "" };
    case ReducerActions.SET_TOKEN:
      return { ...state, token: action.payload || "" };
    default:
      return state;
  }
};

export default userReducer;
