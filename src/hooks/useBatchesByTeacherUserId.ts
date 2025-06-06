// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllBatchesByTeacherUserId } from "@/api/services/asign-teacher";

export const useBatchesByTeacherUserId = (userId: string) => {
  return useQuery({
    queryKey: ["asign-teacher-with-batches", userId],
    queryFn: () => getAllBatchesByTeacherUserId({ userId }),
    enabled: !!userId,
  });
};
