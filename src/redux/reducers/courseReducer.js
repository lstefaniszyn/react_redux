import actionsType from "../actions/actionsTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case actionsType.CREATE_COURSE:
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
