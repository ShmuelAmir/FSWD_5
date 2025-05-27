import axiosInstance from "./axiosInstance";

export const PHOTOS_URL = "photos";

export function getPhotoUrl(id) {
  return `${PHOTOS_URL}/${id}`;
}

export function createPhoto(newPhoto) {
  return axiosInstance.post(PHOTOS_URL, newPhoto);
}

export function updatePhoto(id, updatedPhoto) {
  return axiosInstance.patch(getPhotoUrl(id), updatedPhoto);
}

export function deletePhoto(id) {
  return axiosInstance.delete(getPhotoUrl(id));
}
