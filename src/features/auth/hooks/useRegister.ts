// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { register } from "@/api/services/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
