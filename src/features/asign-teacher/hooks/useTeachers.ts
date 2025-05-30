// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getAllAsignTeacherUsers } from "@/api/services/asign-teacher";
import { asignTeacherUsersAtom } from "../recoil/asignTeacherAtom";

export const useTeachers = () => {
  const setAsignTeacherUsers = useSetRecoilState(asignTeacherUsersAtom);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllAsignTeacherUsers,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const teachers = data.teachers;
      setAsignTeacherUsers(teachers);
    }
  }, [isSuccess, data]);

  return {
    isError,
    isLoading,
  };
};
