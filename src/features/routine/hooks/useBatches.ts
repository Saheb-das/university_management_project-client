import { getAllBatches } from "@/api/services/batch";
import { useQuery } from "@tanstack/react-query";

export const useBatches = () => {
  return useQuery({
    queryKey: ["batch"],
    queryFn: getAllBatches,
  });
};
