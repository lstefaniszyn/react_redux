import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  //added for Redux debugging purpose
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //immutableStateInvariantMiddleware  will warn us if we accidentally mutate Redux state
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers( applyMiddleware( thunk, immutableStateInvariantMiddleware() ) ),
  );
}
