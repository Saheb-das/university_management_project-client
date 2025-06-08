// internal import
import apiClient from "../client";
import { HttpMethod, ProjectAPIs } from "../endpoints";

// types import
import { IMyProjectsRes } from "@/features/dashboard/types/student";

export async function getProjectsByUserId(params: {
  user: string;
}): Promise<IMyProjectsRes | null> {
  const { method, url } = ProjectAPIs.get_projects_by_user_id;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
