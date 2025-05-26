import axiosInstance from "./axiosInstance";

export async function createUser(user) {
  return axiosInstance.post("users", user);
}
