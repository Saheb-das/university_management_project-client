// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllSubjectsBySemId } from "@/api/services/subject";

export const useSubjectsBySemId = (semId: string) => {
  return useQuery({
    queryKey: ["subjects", semId],
    queryFn: () => getAllSubjectsBySemId({ sem: semId }),
  });
};
