// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getPrevMonthTransactionByStuffUserId } from "@/api/services/transaction";

export const usePrevMonthTransaction = (userId: string) => {
  return useQuery({
    queryKey: ["transaction-stuff", userId],
    queryFn: () => getPrevMonthTransactionByStuffUserId(userId),
    enabled: !!userId,
  });
};
