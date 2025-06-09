// external import
import apiClient from "../client";
import { HttpMethod, ResultAPIs } from "../endpoints";

// types import
import {
  ICreateResultsRes,
  IResultBody,
  IResultBySemBatchStudentRes,
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

export async function getResultBySemBatchStudentIds(
  semId: string,
  params: { batchId: string; studentId: string }
): Promise<IResultBySemBatchStudentRes | null> {
  const { method, url } = ResultAPIs.get_result_by_sem_batch_student;
  const response = await apiClient[method as HttpMethod](url(semId), {
    params,
  });
  return response.data;
}

export async function createResult(
  body: IResultBody
): Promise<ICreateResultsRes | null> {
  const { method, url } = ResultAPIs.create_result;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}
