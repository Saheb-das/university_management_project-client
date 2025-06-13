// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { courseInfoAtom } from "../recoil/tutionFeeAtom";
import { getCourseById } from "@/api/services/tution-fee";

export const useCourseById = (courseId: string) => {
  const setCourse = useSetRecoilState(courseInfoAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCourse(data.course);
    }
  }, [isSuccess, data]);
};
