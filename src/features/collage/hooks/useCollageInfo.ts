// external import
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getCollageById } from "@/api/services/collage";
import { collageAtom } from "../recoil/collageAtom";
import { useEffect } from "react";

export const useCollageInfo = (id: string) => {
  const setCollageInfo = useSetRecoilState(collageAtom);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["collage", id],
    queryFn: () => getCollageById(id),
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { collage } = data;
      setCollageInfo(collage);
    }
  }, [isSuccess, data]);

  return { isError, isLoading };
};
