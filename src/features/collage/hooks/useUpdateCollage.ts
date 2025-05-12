// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateCollage } from "@/api/services/collage";

// types import
import { ICollageUpdatePayload } from "../types/collage";

export const useUpdateCollage = (id: string) => {
  return useMutation({
    mutationFn: (payload: ICollageUpdatePayload) => updateCollage(id, payload),
  });
};
