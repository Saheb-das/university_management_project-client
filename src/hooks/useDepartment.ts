import { getDepartments } from "@/api/services/department";
import { departmentsWithDegreesAtom } from "@/recoil/atoms/filterAtom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useDepartments = (degree: string) => {
  const setDeprts = useSetRecoilState(departmentsWithDegreesAtom);
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
