// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllAsignedSubjectsByTeacherId } from "@/api/services/asign-teacher";

export const useAsignedSubjectsByTeacherId = (teacherId: string) => {
  return useQuery({
    queryKey: ["asign-subjects", teacherId],
    queryFn: () => getAllAsignedSubjectsByTeacherId(teacherId),
  });
};
