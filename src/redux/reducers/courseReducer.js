import actionsType from "../actions/actionsTypes";
import initState from "./initialState";

export default function courseReducer(state = initState.courses, action) {
  switch (action.type) {
    case actionsType.CREATE_COURSE:
      return [...state, { ...action.course }];
    case actionsType.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
