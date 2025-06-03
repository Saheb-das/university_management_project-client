// external import
import apiClient from "../client";
import { HttpMethod, ResultAPIs } from "../endpoints";

// types import
import {
  ICreateResultsRes,
  IResultBody,
  IResultByStudentExamSemRes,
} from "@/features/result/types/result";

export async function getResultByStudentExamSem(
  studentId: string,
  examId: string,
  params: { semId: string }
): Promise<IResultByStudentExamSemRes | null> {
  const { method, url } = ResultAPIs.get_result_by_student_exam_sem;
  const response = await apiClient[method as HttpMethod](
    url(studentId, examId),
    { params }
  );
  return response.data;
}

export async function createResult(
  body: IResultBody
): Promise<ICreateResultsRes | null> {
  const { method, url } = ResultAPIs.create_result;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}
