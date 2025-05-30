// internal import
import apiClient from "../client";
import { BatchAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IBatchesRes,
  IBatchWithSemRes,
} from "@/features/routine/types/routine";

export async function getAllBatches(
  params: any = {}
): Promise<IBatchesRes | null> {
  const { method, url } = BatchAPIs.get_batches;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getSemestersByBatchId(
  id: string,
  params: any = {}
): Promise<IBatchWithSemRes | null> {
  const { method, url } = BatchAPIs.get_semesters_by_batch_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}
