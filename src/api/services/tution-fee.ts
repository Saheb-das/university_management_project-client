// internal import
import apiClient from "../client";
import { HttpMethod, TutionFeeAPIs } from "../endpoints";

// types import
import {
  ICourseRes,
  IFeeTransByStudentRes,
  IFeeVerifyBody,
  IVerifyFeeRes,
} from "@/features/tution-fees/types/tutionFee";

export async function getCourseById(id: string): Promise<ICourseRes | null> {
  const { method, url } = TutionFeeAPIs.get_course_by_id;
  const response = await apiClient[method as HttpMethod](url(id));
  return response.data;
}

export async function getFeeTransByStudentId(
  id: string,
  params: { semNo: string; batch: string }
): Promise<IFeeTransByStudentRes | null> {
  const { method, url } = TutionFeeAPIs.get_tution_fee_tran_by_student_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function verifyTutionFeeById(
  id: string,
  body: IFeeVerifyBody
): Promise<IVerifyFeeRes | null> {
  const { method, url } = TutionFeeAPIs.verify_tution_fee_by_id;
  const response = await apiClient[method as HttpMethod](url(id), body);
  return response.data;
}
