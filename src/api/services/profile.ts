// internal import
import apiClient from "../client";
import { HttpMethod, ProfileAPIs } from "../endpoints";

// types import
import {
  IUpdatePasswordRes,
  IUserProfileRes,
  TChangePasswordInfo,
} from "@/features/profile/types/profile";

export async function getCompleteProfile(
  id: string,
  params: any = {}
): Promise<IUserProfileRes | null> {
  const { method, url } = ProfileAPIs.get_by_userId;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function updateProfile(
  id: string,
  data: any,
  role: string
): Promise<IUserProfileRes | null> {
  const { method, url } = ProfileAPIs.update_profile;
  const response = await apiClient[method as HttpMethod](url(id), data, {
    params: { role },
  });
  return response.data;
}

export async function updatePassword(
  id: string,
  data: TChangePasswordInfo
): Promise<IUpdatePasswordRes | null> {
  const { method, url } = ProfileAPIs.update_password;
  const response = await apiClient[method as HttpMethod](url(id), data);
  return response.data;
}
