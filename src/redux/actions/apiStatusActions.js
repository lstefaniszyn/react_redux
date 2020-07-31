import actionsTypes from "./actionsTypes";

export function beginApiCall() {
  return { type: actionsTypes.BEGIN_API_CALL };
}

export function errorApiCall(error) {
  return { type: actionsTypes.ERROR_API_CALL, error: error };
}
