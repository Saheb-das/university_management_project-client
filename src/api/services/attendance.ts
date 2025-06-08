// internal import
import apiClient from "../client";
import { AttendanceAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IAttendanceCountRes,
  IAttendanceQuery,
  IAttendancesBody,
  ICreateAttendancesRes,
} from "@/features/attendance/types/attendance";

export async function createAttendances(
  body: IAttendancesBody,
  params: IAttendanceQuery
): Promise<ICreateAttendancesRes | null> {
  const { method, url } = AttendanceAPIs.create_attendances;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getAttendanceCountByStudentId(
  id: string,
  params: { batchId: string; semId: string }
): Promise<IAttendanceCountRes | null> {
  const { method, url } = AttendanceAPIs.get_attendance_count_by_student_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}
