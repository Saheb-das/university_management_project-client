// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { removeAsignedSubject } from "@/api/services/asign-teacher";

export const useRemoveAsignedSubject = () => {
  return useMutation({
    mutationFn: ({ id, subId }: { id: string; subId: string }) =>
      removeAsignedSubject(id, { subject: subId }),
  });
};
