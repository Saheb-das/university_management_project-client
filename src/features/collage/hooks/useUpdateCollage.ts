// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateCollage } from "@/api/services/collage";

export const useUpdateCollage = () => {
  return useMutation({
    mutationFn: updateCollage,
  });
};
