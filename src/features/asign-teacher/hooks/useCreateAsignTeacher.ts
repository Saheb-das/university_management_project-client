// external import
import { useMutation } from "@tanstack/react-query";

// internal import
import { createAsignTeacher } from "@/api/services/asign-teacher";

// types import
import { TAsignTeacherBody } from "../types/asign-teacher";

export const useCreateAsignTeacher = (id: string) => {
  return useMutation({
    mutationFn: (body: TAsignTeacherBody) => createAsignTeacher(id, body),
  });
};
