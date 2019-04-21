import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./reducers/tasksReducer";

const initialState = {
  isLoading: false,
  tasks: []
};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  tasksReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
