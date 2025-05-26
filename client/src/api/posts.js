import axiosInstance from "./axiosInstance";

export function getPostsUrl(searchValue) {
  let url = "posts";
  if (searchValue) {
    url += `?q=${searchValue}`;
  }
  return url;
}

export function fetchPost(id) {
  return axiosInstance.get(`posts/${id}`);
}

export function createPost(post) {
  axiosInstance.post("posts", post);
}

export function updatePost(id, post) {
  axiosInstance.put(`posts/${id}`, post);
}

export function deletePost(id) {
  axiosInstance.delete(`posts/${id}`);
}
