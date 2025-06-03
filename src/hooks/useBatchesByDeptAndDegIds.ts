// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllBatchesByDeptIdAndDegId } from "@/api/services/batch";

export const useBatchesByDeptAndDegIds = (deptId: string, degId: string) => {
  return useQuery({
    queryKey: ["batches", deptId, degId],
    queryFn: () => getAllBatchesByDeptIdAndDegId({ deptId, degId }),
    enabled: !!deptId && !!degId,
  });
};
