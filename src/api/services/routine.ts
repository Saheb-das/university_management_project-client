// internal import
import apiClient from "../client";
import { RoutineAPIs, HttpMethod } from "../endpoints";

// types import
import {
  ILecturesByTeacherUserIdAndDay,
  IRoutineBody,
  IRoutineByBatchAndSemRes,
  IRoutineRes,
  IScheduleLecturesBatchAndSemRes,
} from "@/features/routine/types/routine";

export async function createRoutine(
  body: IRoutineBody
): Promise<IRoutineRes | null> {
  const { method, url } = RoutineAPIs.create_routine;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

export async function getRoutineByBatchIdAndSemId(
  batchName: string,
  params: { sem: string }
): Promise<IRoutineByBatchAndSemRes | null> {
  const { method, url } = RoutineAPIs.get_routine_by_batch_id_sem_no;
  const response = await apiClient[method as HttpMethod](url(batchName), {
    params,
  });
  return response.data;
}

export async function getScheduleByBatchIdAndDaySemId(
  id: string,
  params: { day: string; semId: string }
): Promise<IScheduleLecturesBatchAndSemRes | null> {
  const { method, url } = RoutineAPIs.get_schedule_by_batch_id_and_day;
  const response = await apiClient[method as HttpMethod](url(id), {
    params,
  });
  return response.data;
}

export async function getLecturesByTeacherUserIdAndDay(params: {
  day: string;
  userId: string;
}): Promise<ILecturesByTeacherUserIdAndDay | null> {
  const { method, url } = RoutineAPIs.get_lectures_by_teacher_user_id_and_day;
  const response = await apiClient[method as HttpMethod](url, {
    params,
  });
  return response.data;
}
