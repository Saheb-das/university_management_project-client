// internal import
import apiClient from "../client";
import { HttpMethod, StatsAPIs } from "../endpoints";

// types import
import {
  TGrowthStatsRes,
  TStudentDeptRes,
  TStuffStatsRes,
  TTeacherDeptRes,
} from "@/features/dashboard/types/superadmin";

export async function getStudentByDept(
  params: any = {}
): Promise<TStudentDeptRes[] | null> {
  const { method, url } = StatsAPIs.student_by_dept;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getTeacherByDept(
  params: any = {}
): Promise<TTeacherDeptRes[] | null> {
  const { method, url } = StatsAPIs.teacher_by_dept;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getStuffStats(
  params: any = {}
): Promise<TStuffStatsRes[] | null> {
  const { method, url } = StatsAPIs.stuff_stats;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getRevenue(params: any = {}) {
  const { method, url } = StatsAPIs.revenue;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getGrowth(
  params: any = {}
): Promise<TGrowthStatsRes[] | null> {
  const { method, url } = StatsAPIs.growth;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getPlacement(params: any = {}) {
  const { method, url } = StatsAPIs.placement;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getSatisfyStudent(params: any = {}) {
  const { method, url } = StatsAPIs.satisfy_student;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
