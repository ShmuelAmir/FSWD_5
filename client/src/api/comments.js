import axiosInstance from "./axiosInstance";

export function fetchComments() {
  return axiosInstance.get("/comments");
}
export function fetchComment() {}
export function createComment() {}
export function updateComment() {}
export function deleteComment() {}
