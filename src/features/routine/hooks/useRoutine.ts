import { getRoutineByBatchIdAndSemId } from "@/api/services/routine";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { routineScheduleAtom } from "../recoil/routineAtom";

export const useRoutine = (batchName: string, semId: string) => {
  const setRoutineSchedule = useSetRecoilState(routineScheduleAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["routine", batchName, semId],
    queryFn: () => getRoutineByBatchIdAndSemId(batchName, { sem: semId }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setRoutineSchedule(data.routine.schedules);
    }
  }, [data, isSuccess]);
};
