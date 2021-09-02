import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// https://tasktify-pj.herokuapp.com
// http://localhost:5000

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchTasks = () => API.get("/tasks");
export const createTask = (newTask) => API.post("/tasks", newTask);
export const updateTask = (id, updatedTask) =>
  API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const fetchTaskGroups = () => API.get("/taskgroups");
export const createTaskGroup = (newTaskGroup) =>
  API.post("/taskgroups", newTaskGroup);
export const updateTaskGroup = (id, updatedTaskGroup) =>
  API.patch(`/taskgroups/${id}`, updatedTaskGroup);
export const deleteTaskGroup = (id) => API.delete(`/taskgroups/${id}`);

export const getTeachers = () => API.get("/teacher");
export const updateTeacher = (id, updatedTeacher) =>
  API.patch(`/teacher/${id}`, updatedTeacher);
export const signIn = (formData) => API.post("/teacher/signin", formData);
export const signUp = (formData) => API.post("/teacher/signup", formData);
