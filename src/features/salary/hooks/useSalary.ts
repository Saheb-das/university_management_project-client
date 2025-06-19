// external import
import { getMyAllTrans } from "@/api/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

// internal import
import { salariesTransAtom } from "../recoil/salaryAtom";

export const useSalary = (role: string, userId: string) => {
  const setTransactions = useSetRecoilState(salariesTransAtom);

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["transactions", role, userId],
    queryFn: getMyAllTrans,
    enabled: !!role && !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTransactions(data.transactions);
    }
  }, [isSuccess, data]);

  return {
    isLoading,
    error,
  };
};
