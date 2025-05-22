import axiosInstance from "./axiosInstance";

export function fetchUsers() {
  return axiosInstance.get("users");
}

export function fetchUser(id) {
  return axiosInstance.get(`users/${id}`);
}

export async function createUser(user) {
  return axiosInstance.post("users", user);
}
