import axios from "axios";

export function fetchUser(id) {
  try {
    return axios.get(`${import.meta.env.BASE_URL}/users/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export function login() {}
export function register() {}
