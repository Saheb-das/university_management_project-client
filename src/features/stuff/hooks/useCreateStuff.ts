// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createStuff } from "@/api/services/user";

export const useCreateStuff = () => {
  return useMutation({
    mutationFn: createStuff,
  });
};
