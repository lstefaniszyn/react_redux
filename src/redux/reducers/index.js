import { combineReducers } from "redux";

import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiCallStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallStatus: apiCallStatusReducer,
});

export default rootReducer;
