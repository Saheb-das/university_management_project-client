// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateStudentStatus } from "@/api/services/student";

// types import
import { TStatus } from "../types/student";

export const useUpdateStatus = (studentId: string) => {
  return useMutation({
    mutationFn: (status: TStatus) => updateStudentStatus(studentId, { status }),
  });
};
