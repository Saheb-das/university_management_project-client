import { createRoutine } from "@/api/services/routine";
import { useMutation } from "@tanstack/react-query";

export const useCreateRoutine = () => {
  return useMutation({
    mutationFn: createRoutine,
  });
};
