import { StateActionTypes } from "./state.types";

export const setCurrentState = stateValue => ({
  type: StateActionTypes.SET_CURRENT_STATE,
  payload: stateValue
});
