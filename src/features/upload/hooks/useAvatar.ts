import { uploadAvatar } from "@/api/services/upload";
import { useMutation } from "@tanstack/react-query";

export const useAvatar = () => {
  return useMutation({
    mutationFn: uploadAvatar,
  });
};
