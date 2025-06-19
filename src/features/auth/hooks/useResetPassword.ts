// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { resetPassword } from "@/api/services/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
