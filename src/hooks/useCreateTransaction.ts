// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createNewTrans } from "@/api/services/transaction";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createNewTrans,
  });
};
