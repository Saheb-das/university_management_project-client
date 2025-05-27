// internal import
import apiClient from "../client";
import { HttpMethod, StudentAPIs } from "../endpoints";

// types import
import {
  IStudentRes,
  IStudentsRes,
  TStatus,
} from "@/features/student/types/student";

type TFilter = {
  deprt: string;
  deg: string;
  year: string;
};
export async function getStudentsByDeptDegAndYear(
  params: TFilter
): Promise<IStudentsRes | null> {
  const { method, url } = StudentAPIs.get_students_by_dept_deg_year;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function updateStudentStatus(
  id: string,
  body: { status: TStatus },
  params: any = {}
): Promise<IStudentRes | null> {
  const { method, url } = StudentAPIs.update_status;
  const response = await apiClient[method as HttpMethod](url(id), body, {
    params,
  });
  return response.data;
}
