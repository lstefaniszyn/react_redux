import actionsType from "../actions/actionsTypes";
import initState from "./initialState";

export default function courseSortReducer(
  state = initState.sortStatus,
  action
) {
  switch (action.type) {
    case actionsType.LOAD_COURSE_SORT_SUCCESS:
      return status;
    case actionsType.UPDATE_COURSE_SORT_SUCCESS:
      return {
        ...initState.sortStatus,
        [action.sortType.name]: {
          sortType: action.sortType.type,
          name: `${action.sortType.name}`,
        },
      };
    default:
      return state;
  }
}
