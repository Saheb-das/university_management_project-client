// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { updatePassword } from "@/api/services/profile";

// types import
import { TChangePasswordInfo } from "../types/profile";

export const useUpdatePassword = (id: string) => {
  return useMutation({
    mutationFn: (data: TChangePasswordInfo) => updatePassword(id, data),
  });
};
