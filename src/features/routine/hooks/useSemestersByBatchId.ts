import { getSemestersByBatchId } from "@/api/services/batch";
import { useQuery } from "@tanstack/react-query";

export const useSemestersByBatchId = (batchId: string) => {
  return useQuery({
    queryKey: ["semesters", batchId],
    queryFn: () => getSemestersByBatchId(batchId),
    enabled: !!batchId,
  });
};
