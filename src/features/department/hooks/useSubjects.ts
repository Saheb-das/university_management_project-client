import { getSubjectsByCourseId } from "@/api/services/department";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { courseSubjectsAtom } from "../recoil/coursesAtom";

export const useSubjects = (courseId: string) => {
  const setCourseSubjects = useSetRecoilState(courseSubjectsAtom);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["subjects", courseId],
    queryFn: () => getSubjectsByCourseId({ courseId }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCourseSubjects(data.courseSubjects);
    }
  }, [data, isSuccess, courseId]);

  return {
    isError,
    isLoading,
  };
};
