// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { tutionFeeTransationByStudentAtom } from "../recoil/tutionFeeAtom";
import { getFeeTransByStudentId } from "@/api/services/tution-fee";

export const useFeeTransactionByStudentId = (
  studentId: string,
  semNo: string,
  batch: string
) => {
  const setFeeTrans = useSetRecoilState(tutionFeeTransationByStudentAtom);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["transactions-students", studentId, semNo, batch],
    queryFn: () => getFeeTransByStudentId(studentId, { semNo, batch }),
    enabled: !!studentId && !!semNo && !!batch,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFeeTrans(data.transaction);
    }
  }, [isSuccess, data]);

  return {
    isError,
    isLoading,
  };
};
