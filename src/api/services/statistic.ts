// internal import
import apiClient from "../client";
import { HttpMethod, StatsAPIs } from "../endpoints";

// types import
import {
  IGrowthStatsRes,
  IPlacementDeptRes,
  IStudentDeptRes,
  IStuffStatsRes,
  ITeacherDeptRes,
} from "@/features/dashboard/types/superadmin";

export async function getStudentByDept(
  params: any = {}
): Promise<IStudentDeptRes | null> {
  const { method, url } = StatsAPIs.student_by_dept;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getTeacherByDept(
  params: any = {}
): Promise<ITeacherDeptRes | null> {
  const { method, url } = StatsAPIs.teacher_by_dept;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getStuffStats(
  params: any = {}
): Promise<IStuffStatsRes | null> {
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
): Promise<IGrowthStatsRes | null> {
  const { method, url } = StatsAPIs.growth;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getPlacement(
  params: any = {}
): Promise<IPlacementDeptRes | null> {
  const { method, url } = StatsAPIs.placement;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getSatisfyStudent(params: any = {}) {
  const { method, url } = StatsAPIs.satisfy_student;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
