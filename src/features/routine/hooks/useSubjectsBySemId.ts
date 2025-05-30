// external import
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// internal import
import { getAllSubjectsBySemId } from "@/api/services/subject";
import { subjectsAtom } from "../recoil/routineAtom";

export const useSubjectsBySemId = (semId: string) => {
  const setSubjects = useSetRecoilState(subjectsAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ["subjects", semId],
    queryFn: () => getAllSubjectsBySemId({ sem: semId }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSubjects(data.subjects);
    }
  }, [data, isSuccess]);
};
