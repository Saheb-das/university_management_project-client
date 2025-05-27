import { getStudentsByDeptDegAndYear } from "@/api/services/student";
import { useQuery } from "@tanstack/react-query";

export const useStudents = (dept: string, deg: string, year: string) => {
  return useQuery({
    queryKey: ["students", dept, deg, year],
    queryFn: () => getStudentsByDeptDegAndYear({ deprt: dept, deg, year }),
  });
};
