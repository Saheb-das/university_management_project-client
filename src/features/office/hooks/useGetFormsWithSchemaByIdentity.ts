// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { dynamicFormsWithSchemaAtom } from "../recoil/officeAtom";
import { getIdentityForms } from "@/api/services/office";

export const useGetFormsWithSchemaIdentity = (
  role: string,
  batchId?: string
) => {
  const setDynamicFormSchema = useSetRecoilState(dynamicFormsWithSchemaAtom);

  let enableCluse;
  if (role === "student") {
    enableCluse = !!batchId && !!role;
  } else {
    enableCluse = !!role;
  }

  const { data, isSuccess } = useQuery({
    queryKey: ["forms", batchId, role],
    queryFn: () =>
      getIdentityForms({
        identity: role === "student" ? `${role}:${batchId}` : `${role}`,
      }),
    enabled: enableCluse,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setDynamicFormSchema(data.forms);
    }
  }, [isSuccess, data]);
};
