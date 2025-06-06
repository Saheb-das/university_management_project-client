// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { studentsListForRollRegAtom } from "../recoil/examceller/dashboardAtom";
import { getStudentsByBatchId } from "@/api/services/student";

export const useStudentsListForRollReg = (batchId: string) => {
  const setStudents = useSetRecoilState(studentsListForRollRegAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ["students-roll-reg", batchId],
    queryFn: () => getStudentsByBatchId({ batch: batchId }),
    enabled: !!batchId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setStudents(data.students);
    }
  }, [data, isSuccess]);
};
