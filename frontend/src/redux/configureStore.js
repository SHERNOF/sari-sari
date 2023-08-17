import { combineReducers, createStore } from "redux";
import snackbarReducer from "./snackbar";

const reducer = combineReducers({
  snackbar: snackbarReducer
});

const reduxStore = createStore(reducer, {});

export default reduxStore;
