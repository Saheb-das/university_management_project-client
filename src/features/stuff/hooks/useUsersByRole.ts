// external import
import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

// internal import
import { usersAtom } from "../recoil/usersAtom";
import { getUsersByRole } from "@/api/services/user";
import { useEffect } from "react";

// types import
import { TStuffRole } from "../types/stuff";

export const useUsersByRole = (role: TStuffRole) => {
  const setUsers = useSetRecoilState(usersAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["users", role],
    queryFn: () => getUsersByRole({ role }),
    enabled: !!role,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data.users);
    }
  }, [data, isSuccess]);
};
