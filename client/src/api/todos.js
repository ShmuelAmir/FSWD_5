import axiosInstance from "./axiosInstance";

export const TODOS_URL = "todos";

export function getTodosUrl(userId, searchValue, sortBy) {
  let url = TODOS_URL + `?userId=${userId}`;
  if (searchValue) {
    url += `&q=${searchValue}`;
  }
  if (sortBy) {
    url += `&_sort=${sortBy}`;
  }
  return url;
}

export function getTodoUrl(id) {
  return `${TODOS_URL}/${id}`;
}

export function createTodo(todo) {
  return axiosInstance.post(TODOS_URL, todo);
}

export function updateTodo(id, todo) {
  return axiosInstance.patch(getTodoUrl(id), todo);
}

export function deleteTodo(id) {
  return axiosInstance.delete(getTodoUrl(id));
}
