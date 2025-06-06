// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getNotesByBatchId } from "@/api/services/note";

export const useNotesByBatchId = (batchId: string) => {
  return useQuery({
    queryKey: ["notes", batchId],
    queryFn: () => getNotesByBatchId(batchId),
    enabled: !!batchId,
  });
};
