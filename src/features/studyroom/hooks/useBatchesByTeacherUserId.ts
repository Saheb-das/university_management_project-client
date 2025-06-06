// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllBatchesByTeacherUserId } from "@/api/services/asign-teacher";
import { useSetRecoilState } from "recoil";
import { asignsWithBatchAtom } from "../recoil/studyroomAtom";
import { useEffect } from "react";

export const useBatchesByTeacherUserId = (userId: string) => {
  const setAsignsWithBatch = useSetRecoilState(asignsWithBatchAtom);
  const { data, isSuccess } = useQuery({
    queryKey: ["asigns-with-batch", userId],
    queryFn: () => getAllBatchesByTeacherUserId({ userId }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAsignsWithBatch(data.batches);
    }
  }, [data, isSuccess]);
};
