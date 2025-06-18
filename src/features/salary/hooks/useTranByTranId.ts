// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getTransById } from "@/api/services/transaction";

export const useTranByTranId = (
  tranId: string,
  payType: "salary" | "tutionFee"
) => {
  return useQuery({
    queryKey: ["transaction-id", tranId, payType],
    queryFn: () => getTransById(tranId, { payType }),
    enabled: !!tranId,
  });
};
