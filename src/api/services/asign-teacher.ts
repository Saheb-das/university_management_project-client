// internal import
import apiClient from "../client";
import { AsignTeacherAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IAsignTeacherUsersRes,
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
) {
  const { method, url } = AsignTeacherAPIs.asign_teacher;
  const response = await apiClient[method as HttpMethod](url(id), body, {
    params,
  });
  return response.data;
}

export async function getAllSubjectsOfAsignTeacher() {}
