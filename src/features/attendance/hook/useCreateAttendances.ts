// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createAttendances } from "@/api/services/attendance";

// types import
import { IAttendanceQuery, IAttendancesBody } from "../types/attendance";

export const useCreateAttendances = (query: IAttendanceQuery) => {
  return useMutation({
    mutationFn: (body: IAttendancesBody) =>
      createAttendances(body, {
        semester: query.semester,
        batch: query.batch,
        subject: query.subject,
      }),
  });
};
