// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getMyAllTrans } from "@/api/services/transaction";
import { myAllTransactionAtom } from "@/features/transactions/recoil/transaction";

export const useMyAllTransactions = () => {
  const setTrans = useSetRecoilState(myAllTransactionAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["transactions-me"],
    queryFn: getMyAllTrans,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTrans(data.transactions);
    }
  }, [isSuccess, data]);
};
