import { combineReducers } from "redux";

import tasks from "./tasks";
import taskGroups from "./taskGroups";
import auth from "./auth";

export const reducers = combineReducers({ tasks, taskGroups, auth });
