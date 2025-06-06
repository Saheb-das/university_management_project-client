// external import
import { useMutation } from "@tanstack/react-query";

// inernal import
import { uploadNewDoc } from "@/api/services/upload";

export const useUploadDoc = () => {
  return useMutation({
    mutationFn: uploadNewDoc,
  });
};
