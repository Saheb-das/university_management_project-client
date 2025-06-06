// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createNewMaterial } from "@/api/services/note";

export const useCreateNewMaterial = () => {
  return useMutation({
    mutationFn: createNewMaterial,
  });
};
