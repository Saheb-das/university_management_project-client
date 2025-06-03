// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createExam } from "@/api/services/exam";

export const useCreateExam = () => {
  return useMutation({
    mutationFn: createExam,
  });
};
