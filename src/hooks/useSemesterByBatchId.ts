// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getSemestersByBatchId } from "@/api/services/batch";

export const useSemestersByBatchId = (batchId: string) => {
  return useQuery({
    queryKey: ["semesters", batchId],
    queryFn: () => getSemestersByBatchId(batchId),
    enabled: !!batchId,
  });
};
