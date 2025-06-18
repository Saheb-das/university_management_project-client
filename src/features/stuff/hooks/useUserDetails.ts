// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getUserDetailsById } from "@/api/services/user";
import { selectUserDetailsAtom } from "../recoil/usersAtom";

export const useUserDetails = (userId: string) => {
  const setDetailedUser = useSetRecoilState(selectUserDetailsAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserDetailsById(userId, { role: "stuff" }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setDetailedUser(data.user);
    }
  }, [isSuccess, data]);
};
