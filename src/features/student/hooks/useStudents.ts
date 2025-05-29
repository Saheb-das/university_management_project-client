// external import
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getStudentsByDeptDegAndYear } from "@/api/services/student";
import { studentsListAtom } from "../recoil/studentAtom";
import { useEffect } from "react";

export const useStudents = (dept: string, deg: string, year: string) => {
  const setStudents = useSetRecoilState(studentsListAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["students", dept, deg, year],
    queryFn: () => getStudentsByDeptDegAndYear({ deprt: dept, deg, year }),
    enabled: !dept && !deg && !year,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setStudents(data.students);
    }
  }, [data, isSuccess]);
};
