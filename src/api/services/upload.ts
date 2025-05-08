// internal import
import apiClient from "../client";
import { HttpMethod, UploadAPIs } from "../endpoints";

export async function uploadAvatar(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("avatar", file);

  const { method, url } = UploadAPIs.upload_avatar;
  const response = await apiClient[method as HttpMethod](url, formData);
  return response.data;
}
