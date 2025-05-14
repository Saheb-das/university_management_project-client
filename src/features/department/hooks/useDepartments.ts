// external import
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getDepartments } from "@/api/services/department";
import { departmentsAtom } from "../recoil/departmentAtom";
import { useEffect } from "react";

export const useDepartments = (degree: string) => {
  const setDeprts = useSetRecoilState(departmentsAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ["departments", degree],
    queryFn: () =>
      getDepartments({ degree: degree === "degree" ? "true" : "false" }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setDeprts(data.departments);
    }
  }, [isSuccess, data]);
};
