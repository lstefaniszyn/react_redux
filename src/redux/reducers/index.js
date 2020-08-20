import { combineReducers } from "redux";

import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiCallStatusReducer from "./apiStatusReducer";
import courseSortReducer from "./courseSortReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallStatus: apiCallStatusReducer,
  courseSort: courseSortReducer,
});

export default rootReducer;
