import { updateStatus } from "@/api/services/user";
import { useMutation } from "@tanstack/react-query";
import { TStuffRole } from "../types/stuff";

export const useUpdateStatus = (userId: string, role: TStuffRole) => {
  return useMutation({
    mutationFn: (newStatus: string) =>
      updateStatus(userId, { newStatus }, { role }),
  });
};
