// internal import
import apiClient from "../client";
import { AsignTeacherAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IAsignBatchesRes,
  IAsignedRes,
  IAsignedSubjectsRes,
  IAsignedTeachersByBatchSemRes,
  IAsignTeacherUsersRes,
  IRemoveAsignSubjectRes,
  TAsignTeacherBody,
} from "@/features/asign-teacher/types/asign-teacher";

export async function getAllAsignTeacherUsers(
  params: any = {}
): Promise<IAsignTeacherUsersRes | null> {
  const { method, url } = AsignTeacherAPIs.get_asign_teacher_users;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function createAsignTeacher(
  id: string,
  body: TAsignTeacherBody,
  params: any = {}
): Promise<IAsignedRes | null> {
  const { method, url } = AsignTeacherAPIs.asign_teacher;
  const response = await apiClient[method as HttpMethod](url(id), body, {
    params,
  });
  return response.data;
}

export async function getAllAsignedSubjectsByTeacherId(
  id: string
): Promise<IAsignedSubjectsRes | null> {
  const { method, url } =
    AsignTeacherAPIs.get_all_asigned_subjects_by_teacher_id;
  const response = await apiClient[method as HttpMethod](url(id));
  return response.data;
}

export async function getAllBatchesByTeacherUserId(params: {
  userId: string;
}): Promise<IAsignBatchesRes | null> {
  const { method, url } = AsignTeacherAPIs.get_all_batches_by_teacher_user_id;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getAsignedTeachersByBatchAndSemIds(
  batchId: string,
  semId: string
): Promise<IAsignedTeachersByBatchSemRes | null> {
  const { method, url } =
    AsignTeacherAPIs.get_asigned_teachers_by_batch_sem_ids;
  const response = await apiClient[method as HttpMethod](url(batchId, semId));
  return response.data;
}

export async function removeAsignedSubject(
  id: string,
  params: { subject: string }
): Promise<IRemoveAsignSubjectRes | null> {
  const { method, url } = AsignTeacherAPIs.remove_asigned_subject;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}
