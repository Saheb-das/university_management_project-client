// internal import
import { IUserProfileRes } from "@/features/profile/types/profile";
import apiClient from "../client";
import { HttpMethod, ProfileAPIs } from "../endpoints";

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
  data: any
): Promise<IUserProfileRes | null> {
  const { method, url } = ProfileAPIs.update_profile;
  const response = await apiClient[method as HttpMethod](url(id), data);
  return response.data;
}
