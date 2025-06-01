// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createEvent } from "@/api/services/event";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};
