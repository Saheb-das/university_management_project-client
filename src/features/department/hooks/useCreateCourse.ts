import { createCourse } from "@/api/services/department";
import { useMutation } from "@tanstack/react-query";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
  });
};
