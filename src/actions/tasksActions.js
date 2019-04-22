import axios from "axios";
import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "../actions/types";

// get all tasks
export const getTasks = () => dispatch => {
  dispatch({
    type: GET_TASKS_REQUEST
  });

  // use localStorage as a temporary solution without a back end
  if (localStorage.tasks) {
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: JSON.parse(localStorage.tasks)
    });
    return;
  }

  return axios
    .get("https://raw.githubusercontent.com/nadktk/temp/master/tasks.json")
    .then(res => {
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: res.data
      });
      localStorage.setItem("tasks", JSON.stringify(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: []
      })
    );
};

// update task
export const updateTask = (id, newTask, allTasks) => dispatch => {
  dispatch({
    type: UPDATE_TASK_REQUEST
  });
  return axios
    .put(`https://someaddress.com/api/tasks/${id}`, newTask)
    .then(res => {
      // todo: to be changed
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: allTasks
      });
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    })
    .catch(err => {
      // todo: to be changed
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: allTasks
      });
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    });
};
