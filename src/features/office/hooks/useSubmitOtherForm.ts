// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { submitOtherForm } from "@/api/services/office";

export const useSubmitOtherForm = () => {
  return useMutation({
    mutationFn: submitOtherForm,
  });
};
