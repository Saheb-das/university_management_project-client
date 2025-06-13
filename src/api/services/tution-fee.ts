// internal import
import apiClient from "../client";
import { HttpMethod, TutionFeeAPIs } from "../endpoints";

// types import
import { ICourseRes } from "@/features/tution-fees/types/tutionFee";

export async function getCourseById(id: string): Promise<ICourseRes | null> {
  const { method, url } = TutionFeeAPIs.get_course_by_id;
  const response = await apiClient[method as HttpMethod](url(id));
  return response.data;
}
