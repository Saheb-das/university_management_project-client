import { getAllBatchByQuery } from "@/api/services/admission";
import { useQuery } from "@tanstack/react-query";

export const useBatches = (deptId: string, degId: string, courseId: string) => {
  return useQuery({
    queryKey: ["batches", deptId, degId, courseId],
    queryFn: () => getAllBatchByQuery({ deptId, degId, courseId }),
    enabled: !!deptId && !!degId && !!courseId,
  });
};
