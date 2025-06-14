// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { allTransactionsAtom } from "../recoil/transaction";
import { getAllTrans } from "@/api/services/transaction";

export const useAllTransactions = (
  fromDate?: string,
  type?: "salary" | "tutionFee"
) => {
  const setTrans = useSetRecoilState(allTransactionsAtom);

  const { data, isSuccess, isError, isLoading, error } = useQuery({
    queryKey: ["transactions", fromDate, type],
    queryFn: () => getAllTrans({ fromDate, type }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTrans(data.transactions);
    }
  }, [isSuccess, data]);

  return {
    isError,
    isLoading,
    error,
  };
};
