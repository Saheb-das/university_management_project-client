// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getStudentDetailsByUserId } from "@/api/services/student";
import { studentUserAtom } from "../recoil/student/dashboardAtom";

export const useStudentUserByUserId = (userId: string) => {
  const setStudent = useSetRecoilState(studentUserAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["student-user", userId],
    queryFn: () => getStudentDetailsByUserId(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setStudent(data.student);
    }
  }, [data, isSuccess]);
};
