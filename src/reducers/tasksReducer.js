import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "../actions/types";

const initialState = {
  isLoading: false,
  tasks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        isLoading: false,
        tasks: action.payload
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
  }
}
