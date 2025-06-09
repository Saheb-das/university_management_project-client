// external import
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// internal import
import { getResultBySemBatchStudentIds } from "@/api/services/result";
import { resultWithDetailsAtom } from "../recoil/academicAtom";

export const useResultBySemBatchStudentIds = (
  semId: string,
  batchId: string,
  studentId: string
) => {
  const setResult = useSetRecoilState(resultWithDetailsAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["results-sems", semId, batchId, studentId],
    queryFn: () => getResultBySemBatchStudentIds(semId, { batchId, studentId }),
    enabled: !!semId && !!batchId && !!studentId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setResult(data.results);
    }
  }, [data, isSuccess]);
};
