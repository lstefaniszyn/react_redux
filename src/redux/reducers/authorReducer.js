import actionsType from "../actions/actionsTypes";
import initState from "./initialState";

export default function authorReducer(state = initState.authors, action) {
  switch (action.type) {
    case actionsType.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
