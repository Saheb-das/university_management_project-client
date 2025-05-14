// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createDepartment } from "@/api/services/department";

export const useCreateDepartment = () => {
  return useMutation({
    mutationFn: createDepartment,
  });
};
