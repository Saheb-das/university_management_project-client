// internal import
import {
  IAdmitsAndCommissionRes,
  IPrevFiveYearsStatsRes,
  IThreeToppersRes,
} from "@/features/dashboard/types/counsellor";
import apiClient from "../client";
import { AdmissionAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IAdmissionRes,
  IAdmissionsRes,
  IBatchesRes,
  IBatchRes,
  TBatchBody,
} from "@/features/admission/types/admission";
import { TAdmissionBody } from "@/zod/admission";

export async function createAdmission(
  body: TAdmissionBody,
  params: any = {}
): Promise<IAdmissionRes | null> {
  const { method, url } = AdmissionAPIs.create_admission;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function createBatch(
  body: TBatchBody,
  params: any = {}
): Promise<IBatchRes | null> {
  const { method, url } = AdmissionAPIs.create_batch;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

interface IBatchQuery {
  deptId: string;
  degId: string;
  courseId: string;
}
export async function getAllBatchByQuery(
  params: IBatchQuery
): Promise<IBatchesRes | null> {
  const { method, url } = AdmissionAPIs.get_all_batches;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

interface QueryParams {
  userId: string;
}
export async function getAllAdmissions(
  params: QueryParams
): Promise<IAdmissionsRes | null> {
  const { method, url } = AdmissionAPIs.get_all_admissions;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getTotalAdmitsAndComs(
  id: string,
  params: any = {}
): Promise<IAdmitsAndCommissionRes | null> {
  const { method, url } = AdmissionAPIs.get_total_admits_coms;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function getPrevFiveYearsStats(
  id: string,
  params: any = {}
): Promise<IPrevFiveYearsStatsRes | null> {
  const { method, url } = AdmissionAPIs.get_prev_years_stats;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function getThreeTopppers(
  params: any = {}
): Promise<IThreeToppersRes | null> {
  const { method, url } = AdmissionAPIs.get_top_three;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
