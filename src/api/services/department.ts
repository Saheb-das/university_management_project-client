// internal import
import {
  ICourseRes,
  ICourseSubjectsRes,
  ICourseWithSemsRes,
  TCourseClient,
} from "@/features/department/types/course";
import apiClient from "../client";
import { DepartmentAPIs, HttpMethod } from "../endpoints";

// types import
import { IDeprtsRes, IDeptRes } from "@/features/department/types/department";
import {
  ISemesterSubjects,
  ISubjectsRes,
} from "@/features/department/types/subject";

export async function createDepartment(
  body: any = {},
  params: any = {}
): Promise<IDeptRes | null> {
  const { method, url } = DepartmentAPIs.create_dept;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getDepartments(
  params: any = {}
): Promise<IDeprtsRes | null> {
  const { method, url } = DepartmentAPIs.get_deprts;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function createCourse(
  body: TCourseClient,
  params: any = {}
): Promise<ICourseRes | null> {
  const { method, url } = DepartmentAPIs.create_course;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getCoursesByDegId(
  params: any = {}
): Promise<ICourseWithSemsRes | null> {
  const { method, url } = DepartmentAPIs.get_courses_by_degId;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function createSubjects(
  body: ISemesterSubjects = {},
  params: any = {}
): Promise<ISubjectsRes | null> {
  const { method, url } = DepartmentAPIs.create_subjects;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getSubjectsByCourseId(
  params: any = {}
): Promise<ICourseSubjectsRes | null> {
  const { method, url } = DepartmentAPIs.get_subjects_by_courseId;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
