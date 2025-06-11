// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getSubmittedFormData } from "@/api/services/office";

export const useGetSubmittedFormData = (formKey: string) => {
  return useQuery({
    queryKey: ["form-submit", formKey],
    queryFn: () => getSubmittedFormData({ formKey }),
    enabled: !!formKey,
  });
};
