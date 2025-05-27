// external import
import { createAsignTeacher } from "@/api/services/asign-teacher";
import { useMutation } from "@tanstack/react-query";
import { TAsignTeacherBody } from "../types/asign-teacher";

export const useCreateAsignTeacher = (id: string) => {
  return useMutation({
    mutationFn: (body: TAsignTeacherBody) => createAsignTeacher(id, body),
  });
};
