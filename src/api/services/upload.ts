// internal import
import { IUploadAvatar, IUploadLogo } from "@/features/upload/types/upload";
import apiClient from "../client";
import { UploadAPIs } from "../endpoints";

export async function uploadAvatar(
  file: File,
  imgOldPath: string
): Promise<IUploadAvatar | null> {
  const formData = new FormData();
  formData.append("profilePic", file);
  formData.append("oldPath", imgOldPath);

  const { method, url } = UploadAPIs.upload_avatar;
  const response = await apiClient.request({
    method: method,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function uploadLogo(
  file: File,
  logoOldPath: string
): Promise<IUploadLogo | null> {
  const formData = new FormData();
  formData.append("logo", file);
  formData.append("oldPath", logoOldPath);

  const { method, url } = UploadAPIs.upload_logo;
  const response = await apiClient.request({
    method: method,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
