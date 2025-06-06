// internal import
import apiClient from "../client";
import { AttendanceAPIs, HttpMethod } from "../endpoints";

// types import
import {
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
