// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createForm } from "@/api/services/office";

// types import
import { IFormBody, IFormBodyQuery } from "../types/office";

export const useCreateDynamicForm = (q: IFormBodyQuery) => {
  return useMutation({
    mutationFn: (body: IFormBody) => createForm(body, q),
  });
};
