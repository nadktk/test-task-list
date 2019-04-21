import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./reducers/tasksReducer";

const initialState = {
  isLoading: false,
  tasks: []
};

const middleware = [thunk];

const store = createStore(
  tasksReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
