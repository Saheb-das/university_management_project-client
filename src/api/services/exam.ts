// internal import
import { ICreateExamsRes, IExamBody } from "@/features/department/types/course";
import apiClient from "../client";
import { ExamAPIs, HttpMethod } from "../endpoints";

// types import
import { IExamsByCourseRes } from "@/features/result/types/result";

export async function getExamsByCourseId(
  id: string,
  params: any = {}
): Promise<IExamsByCourseRes | null> {
  const { method, url } = ExamAPIs.get_exams_by_course_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function createExam(
  body: IExamBody
): Promise<ICreateExamsRes | null> {
  const { method, url } = ExamAPIs.create_exam;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}
