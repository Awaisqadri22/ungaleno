import { createSelector } from "reselect";

const selectState = state => state.stateValue;

export const selectCurrentState = createSelector(
  [selectState],
  stateValue => stateValue.currentState
);
