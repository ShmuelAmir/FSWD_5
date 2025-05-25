import axiosInstance from "./axiosInstance";
import { COMMENTS_URL } from "./comments";

const POSTS_URL = "posts";

export function getPostsUrl(userId, searchValue) {
  let url = POSTS_URL + `?userId=${userId}`;
  if (searchValue) {
    url += `&q=${searchValue}`;
  }
  return url;
}

export function getPostUrl(id) {
  return `${POSTS_URL}/${id}`;
}

export function getPostCommentsUrl(postId) {
  return `${POSTS_URL}/${postId}/${COMMENTS_URL}?_expand=user`;
}

export function createPost(post) {
  axiosInstance.post(POSTS_URL, post);
}

export function updatePost(id, post) {
  axiosInstance.patch(getPostUrl(id), post);
}

export function deletePost(id) {
  axiosInstance.delete(getPostUrl(id));
}
