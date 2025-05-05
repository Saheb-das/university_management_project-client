// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { login } from "@/api/services/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
