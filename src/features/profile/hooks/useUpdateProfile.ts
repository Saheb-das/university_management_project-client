// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateProfile } from "@/api/services/profile";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateProfile(id, data),
  });
};
