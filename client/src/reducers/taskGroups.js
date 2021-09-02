import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (taskGroups = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...taskGroups, action.payload];
    case UPDATE:
      return taskGroups.map((taskGroup) =>
        taskGroup._id === action.payload._id ? action.payload : taskGroup
      );
    case DELETE:
      return taskGroups.filter((taskGroup) => taskGroup._id !== action.payload);
    default:
      return taskGroups;
  }
};
