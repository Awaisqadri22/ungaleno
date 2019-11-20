import { StateActionTypes } from "./state.types";

const INITIAL_STATE = {
  currentState: null
};

const stateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StateActionTypes.SET_CURRENT_STATE:
      return {
        ...state,
        currentState: action.payload
      };
    default:
      return state;
  }
};

export default stateReducer;
