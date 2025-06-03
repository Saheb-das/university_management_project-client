// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createResult } from "@/api/services/result";

export const useCreateResult = () => {
  return useMutation({
    mutationFn: createResult,
  });
};
