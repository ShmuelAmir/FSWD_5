import axiosInstance from "./axiosInstance";

export const COMMENTS_URL = "comments";

export function getCommentUrl(id) {
  return `${COMMENTS_URL}/${id}`;
}

export function createComment(newComment) {
  axiosInstance.create(COMMENTS_URL, newComment);
}

export function updateComment(id, updatedComment) {
  return axiosInstance.patch(getCommentUrl(id), updatedComment);
}

export function deleteComment(id) {
  return axiosInstance.delete(getCommentUrl(id));
}
