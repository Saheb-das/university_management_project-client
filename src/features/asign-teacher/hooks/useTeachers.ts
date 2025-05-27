// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllAsignTeacherUsers } from "@/api/services/asign-teacher";
import { useSetRecoilState } from "recoil";
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
