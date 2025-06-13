// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { verifyPayOrder } from "@/api/services/razorpay";

export const useVerifyPayOrder = () => {
  return useMutation({
    mutationFn: verifyPayOrder,
  });
};
