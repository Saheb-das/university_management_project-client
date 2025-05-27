import { createAdmission } from "@/api/services/admission";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdmission = () => {
  return useMutation({
    mutationFn: createAdmission,
  });
};
