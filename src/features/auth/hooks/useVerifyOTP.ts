// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { verifyOTP } from "@/api/services/auth";

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
  });
};
