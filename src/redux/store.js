import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import logger from "redux-logger";

const middlewares = [thunk, logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
