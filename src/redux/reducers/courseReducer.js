import actionsType from "../actions/actionsTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case actionsType.CREATE_COURSE:
      return [...state, { ...action.course }];
    case actionsType.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
