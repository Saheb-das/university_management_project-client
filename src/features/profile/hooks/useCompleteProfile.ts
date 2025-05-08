// external import
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

// internal import
import { getCompleteProfile } from "@/api/services/profile";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { completeProfileAtom } from "../recoil/atom/completeProfileAtom";

export const useCompleteProfile = () => {
  const basicUser = useRecoilValue(userBasicAtom);
  const setCompleteProfile = useSetRecoilState(completeProfileAtom);

  const userParams =
    basicUser?.role === "student" ? { role: "student" } : { role: "stuff" };

  const userId = basicUser?.id!;

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["complete-profile", userId],
    queryFn: () => getCompleteProfile(userId, userParams),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { user } = data;
      setCompleteProfile(user);
    }
  }, [isSuccess, data]);

  // useEffect(() => {})

  return { isError, isLoading };
};
