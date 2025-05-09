// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updateProfile } from "@/api/services/profile";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ({ id, data, role }: { id: string; data: any; role: string }) =>
      updateProfile(id, data, role),
  });
};
