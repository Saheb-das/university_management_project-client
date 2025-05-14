import { getCoursesByDegId } from "@/api/services/department";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { coursesWithSemestersAtom } from "../recoil/coursesAtom";

export const useCourses = (degId: string, sem: boolean = false) => {
  const setCourses = useSetRecoilState(coursesWithSemestersAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ["courses", degId, sem],
    queryFn: () =>
      getCoursesByDegId({ degreeId: degId, sem: sem ? "true" : "false" }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCourses(data.courses);
    }
  }, [data, isSuccess]);
};
