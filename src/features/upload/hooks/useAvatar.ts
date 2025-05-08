// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { uploadAvatar } from "@/api/services/upload";

export const useAvatar = () => {
  return useMutation({
    mutationFn: uploadAvatar,
  });
};
