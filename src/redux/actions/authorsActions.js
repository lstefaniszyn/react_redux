import actionsType from "./actionsTypes";
import * as authorAPI from "../../api/authorApi";
import { beginApiCall, errorApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: actionsType.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorAPI
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(errorApiCall(error));
        throw error;
      });
  };
}
