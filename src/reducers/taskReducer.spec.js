import tasksReducer from "./tasksReducer.js";
import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "../actions/types";

describe("Tasks reducer", () => {
  it("Get tasks request", () => {
    const action = {
      type: GET_TASKS_REQUEST
    };
    const initialState = {
      isLoading: false,
      tasks: []
    };
    expect(tasksReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it("Get tasks success", () => {
    const action = {
      type: GET_TASKS_SUCCESS,
      payload: ["task1", "task2", "task3"]
    };
    const prevState = {
      isLoading: true,
      tasks: []
    };
    expect(tasksReducer(prevState, action)).toEqual({
      isLoading: false,
      tasks: action.payload
    });
  });

  it("Update task request", () => {
    const action = {
      type: UPDATE_TASK_REQUEST
    };
    const prevState = {
      isLoading: false,
      tasks: ["task1", "task2", "task3"]
    };
    expect(tasksReducer(prevState, action)).toEqual({
      ...prevState
    });
  });

  it("Update task success", () => {
    const action = {
      type: UPDATE_TASK_SUCCESS,
      payload: ["task1", "task2", "task3"]
    };
    const prevState = {
      isLoading: false,
      tasks: ["task4", "task2", "task3"]
    };
    expect(tasksReducer(prevState, action)).toEqual({
      ...prevState,
      tasks: action.payload
    });
  });
});
