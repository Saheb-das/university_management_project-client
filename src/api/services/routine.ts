// internal import
import apiClient from "../client";
import { RoutineAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IRoutineBody,
  IRoutineByBatchAndSemRes,
  IRoutineRes,
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
