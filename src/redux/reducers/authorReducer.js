import actionsType from "../actions/actionsTypes";

export default function authorReducer(state = [], action) {
  switch (action.type) {
    case actionsType.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
