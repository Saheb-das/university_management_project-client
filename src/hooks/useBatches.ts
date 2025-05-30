// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllBatches } from "@/api/services/batch";

export const useBatches = () => {
  return useQuery({
    queryKey: ["batches"],
    queryFn: getAllBatches,
  });
};
