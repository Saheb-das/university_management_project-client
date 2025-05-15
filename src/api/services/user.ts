// internal import
import apiClient from "../client";
import { HttpMethod, UserAPIs } from "../endpoints";

// types import
import {
  IStuffRes,
  IStuffUsersRes,
  IUsersRes,
} from "@/features/stuff/types/stuff";
import { TStuffClient } from "@/zod/user";

export async function createStuff(
  body: TStuffClient,
  params: any = {}
): Promise<IStuffRes | null> {
  const { method, url } = UserAPIs.create_stuff;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getUsersByRole(
  params: any = {}
): Promise<IUsersRes | null> {
  const { method, url } = UserAPIs.get_users_by_role;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getUserDetailsById(
  id: string,
  params: any = {}
): Promise<IStuffUsersRes | null> {
  const { method, url } = UserAPIs.get_user_by_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function updateStatus(
  id: string,
  body: { newStatus: string },
  params: any = {}
): Promise<IStuffUsersRes | null> {
  const { method, url } = UserAPIs.update_status;
  const response = await apiClient[method as HttpMethod](url(id), body, {
    params,
  });
  return response.data;
}
