// external import
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// internal import
import { admissionListAtom } from "../recoil/admissionAtom";
import { getAllAdmissions } from "@/api/services/admission";

export const useAdmittedStudent = (userId: string) => {
  const setAdmissionList = useSetRecoilState(admissionListAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["admissions", userId],
    queryFn: () => getAllAdmissions({ userId }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAdmissionList(data.admissions);
    }
  }, [data, isSuccess]);
};
