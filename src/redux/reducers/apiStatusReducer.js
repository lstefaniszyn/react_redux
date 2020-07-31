import initialState from "./initialState";
import actionsType from "../actions/actionsTypes";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS"; //this is Redux tips and trick to get all actions with name which ends with _SUCCESSED which we have doen on actiontypes
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === actionsType.BEGIN_API_CALL) {
    return state + 1;
  } else if (action.type === actionsType.ERROR_API_CALL ||  actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
