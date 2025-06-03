// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateRollRegByStudentId } from "@/api/services/student";

// types import
import { IIdentifierBody } from "../types/examceller";

export const useCreateStudentRollRegById = (studentId: string) => {
  return useMutation({
    mutationFn: (body: IIdentifierBody) =>
      updateRollRegByStudentId(studentId, body),
  });
};
