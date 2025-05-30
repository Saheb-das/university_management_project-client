// internal import
import apiClient from "../client";
import { HttpMethod, SubjectAPIs } from "../endpoints";

// types import
import { ISubjectsRes } from "@/features/routine/types/routine";

export async function getAllSubjectsBySemId(params: {
  sem: string;
}): Promise<ISubjectsRes | null> {
  const { method, url } = SubjectAPIs.get_subjects_by_sem_id;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
