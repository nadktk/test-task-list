import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import { getTasks, updateTask } from "./tasksActions";
import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "./types";

const mockData = [
  { id: 1, name: "task1" },
  { id: 2, name: "task2" },
  { id: 3, name: "task2" }
];

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Async tasks action creators", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("creates creates GET_TASKS_REQUEST and then GET_TASKS_SUCCESS when has been done", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData
      });
    });

    const expectedActions = [
      {
        type: GET_TASKS_REQUEST
      },
      { type: GET_TASKS_SUCCESS, payload: mockData }
    ];

    const store = mockStore({ tasks: {} });

    return store.dispatch(getTasks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates UPDATE_TASK_REQUEST and then UPDATE_TASK_SUCCESS when has been done", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData
      });
    });

    const expectedActions = [
      {
        type: UPDATE_TASK_REQUEST
      },
      { type: UPDATE_TASK_SUCCESS, payload: mockData }
    ];

    const store = mockStore({ tasks: {} });

    return store.dispatch(updateTask(2, {}, mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // TO CHANGE: another test for bad request
  it("creates UPDATE_TASK_REQUEST and then UPDATE_TASK_SUCCESS when has been done", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {}
      });
    });

    const expectedActions = [
      {
        type: UPDATE_TASK_REQUEST
      },
      { type: UPDATE_TASK_SUCCESS, payload: mockData }
    ];

    const store = mockStore({ tasks: {} });

    return store.dispatch(updateTask(2, {}, mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
