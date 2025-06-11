// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { submitStudentForm } from "@/api/services/office";

export const useSubmitStudentForm = () => {
  return useMutation({
    mutationFn: submitStudentForm,
  });
};
