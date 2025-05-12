// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { uploadLogo } from "@/api/services/upload";

export const useLogo = (oldPath: string) => {
  return useMutation({
    mutationFn: (file: File) => uploadLogo(file, oldPath),
  });
};
