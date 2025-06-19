// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { forgotPassword } from "@/api/services/auth";

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
