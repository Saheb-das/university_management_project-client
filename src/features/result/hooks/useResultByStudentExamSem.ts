// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getResultByStudentExamSem } from "@/api/services/result";

export const useResultByStudentExamSem = (
  studentId: string,
  examId: string,
  semId: string
) => {
  return useQuery({
    queryKey: ["results", studentId, examId, semId],
    queryFn: () => getResultByStudentExamSem(studentId, examId, { semId }),
    enabled: !!studentId && !!examId && !!semId,
    staleTime: 0,
    refetchOnMount: true,
  });
};
