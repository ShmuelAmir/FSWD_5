import axiosInstance from "./axiosInstance";
import { PHOTOS_URL } from "./photos";

export const ALBUMS_URL = "albums";
export const PAGE_SIZE = 3;

export function getAlbumsUrl(userId, searchValue) {
  let url = ALBUMS_URL + `?userId=${userId}`;
  if (searchValue) {
    url += `&q=${searchValue}`;
  }
  return url;
}

export function getAlbumUrl(id) {
  return `${ALBUMS_URL}/${id}`;
}

export function getAlbumPhotosUrl(albumId, page = 1, perPage = PAGE_SIZE) {
  return `${ALBUMS_URL}/${albumId}/${PHOTOS_URL}?_page=${page}&_limit=${perPage}`;
}

export function createAlbum(album) {
  return axiosInstance.post(ALBUMS_URL, album);
}
export function updateAlbum(id, album) {
  return axiosInstance.patch(getAlbumUrl(id), album);
}
export function deleteAlbum(id) {
  return axiosInstance.delete(getAlbumUrl(id));
}
