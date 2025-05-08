// external import
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getCollageById } from "@/api/services/collage";
import { collageAtom } from "../recoil/collageAtom";

export const useCollageInfo = (id: string) => {
  const setCollageInfo = useSetRecoilState(collageAtom);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["collage", id],
    queryFn: () => getCollageById(id),
  });

  if (isSuccess) {
    setCollageInfo(data);
  }

  return { isError, isLoading };
};
