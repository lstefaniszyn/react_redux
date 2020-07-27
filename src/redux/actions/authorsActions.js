import actionsType from "./actionsTypes";
import * as authorAPI from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: actionsType.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return authorAPI
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
