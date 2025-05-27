import { createBatch } from "@/api/services/admission";
import { useMutation } from "@tanstack/react-query";

export const useCreateBatch = () => {
  return useMutation({
    mutationFn: createBatch,
  });
};
