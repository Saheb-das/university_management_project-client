// external import
import { getAllTrans, getTransById } from "@/api/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

// internal import
import { salariesTransAtom } from "../recoil/salaryAtom";

export const useSalary = (role: string, userId: string) => {
  const setTransactions = useSetRecoilState(salariesTransAtom);

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["transactions", role, userId],
    queryFn: getAllTrans,
    enabled: !!role && !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTransactions(data);
    }
  }, [isSuccess, data]);

  // Fetch a transaction by ID using React Query caching if available
  const getTransactionById = async (id: string) => {
    return useQuery({
      queryKey: ["transaction", id],
      queryFn: () => getTransById(id),
    });
  };

  return {
    isLoading,
    error,
    getTransactionById,
  };
};
