// internal import
import { IUploadAvatar } from "@/features/upload/types/avatar";
import apiClient from "../client";
import { UploadAPIs } from "../endpoints";

export async function uploadAvatar(file: File): Promise<IUploadAvatar | null> {
  const formData = new FormData();
  formData.append("profilePic", file);

  const { method, url } = UploadAPIs.upload_avatar;
  const response = await apiClient.request({
    method: method,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
