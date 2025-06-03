// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { examsByCourseIdAtom } from "../recoil/resultAtom";
import { getExamsByCourseId } from "@/api/services/exam";

export const useExams = (courseId: string) => {
  const setExams = useSetRecoilState(examsByCourseIdAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["exams", courseId],
    queryFn: () => getExamsByCourseId(courseId),
    enabled: !!courseId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setExams(data.exams);
    }
  }, [data, isSuccess]);
};
