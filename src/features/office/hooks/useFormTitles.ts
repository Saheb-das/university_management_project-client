// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { formTitlesAtom } from "../recoil/officeAtom";
import { getFormTitles } from "@/api/services/office";

export const useFormTitles = () => {
  const setFormTitles = useSetRecoilState(formTitlesAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["form-titles"],
    queryFn: getFormTitles,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFormTitles(data.formTitles);
    }
  }, [isSuccess, data]);
};
