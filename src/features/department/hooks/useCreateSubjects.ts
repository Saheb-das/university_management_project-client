// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createSubjects } from "@/api/services/department";

export const useCreateSubjects = () => {
  return useMutation({
    mutationFn: createSubjects,
  });
};
