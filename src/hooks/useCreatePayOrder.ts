// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createPayOrder } from "@/api/services/razorpay";

export const useCreatePayOrder = () => {
  return useMutation({
    mutationFn: (body: { amount: string }) => createPayOrder(body),
  });
};
