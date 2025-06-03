// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getStudentsByBatchId } from "@/api/services/student";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { studentsListByBatchAtom } from "../recoil/resultAtom";

export const useStudentsByBatchId = (batchId: string) => {
  const setStudents = useSetRecoilState(studentsListByBatchAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["students", batchId],
    queryFn: () => getStudentsByBatchId({ batch: batchId }),
    enabled: !!batchId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setStudents(data.students);
    }
  }, [data, isSuccess]);
};
