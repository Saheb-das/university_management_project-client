import { getUserDetailsById } from "@/api/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { selectUserDetailsAtom } from "../recoil/usersAtom";
import { useEffect } from "react";

export const useUserDetails = (userId: string) => {
  const setDetailedUser = useSetRecoilState(selectUserDetailsAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserDetailsById(userId, { role: "stuff" }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setDetailedUser(data.user);
    }
  }, [isSuccess, data]);
};
