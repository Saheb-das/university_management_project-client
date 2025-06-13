// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { verifyTutionFeeById } from "@/api/services/tution-fee";

// types import
import { IFeeVerifyBody } from "../types/tutionFee";

export const useVerifyFeeByTutionFeeId = (feeId: string) => {
  return useMutation({
    mutationFn: (body: IFeeVerifyBody) => verifyTutionFeeById(feeId, body),
  });
};
