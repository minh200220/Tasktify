import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getTaskGroups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTaskGroups();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTaskGroup = (taskGroup) => async (dispatch) => {
  try {
    const { data } = await api.createTaskGroup(taskGroup);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskGroup = (id, taskGroup) => async (dispatch) => {
  try {
    const { data } = await api.updateTaskGroup(id, taskGroup);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskGroup = (id) => async (dispatch) => {
  try {
    await api.deleteTaskGroup(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
