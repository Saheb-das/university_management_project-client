// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { notesBySemAtom } from "../recoil/noteAtom";
import { getNotesByBatchAndSemIds } from "@/api/services/note";

export const useNotesByBatchAndSemIds = (batchId: string, semId: string) => {
  const setNotes = useSetRecoilState(notesBySemAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", semId],
    queryFn: () => getNotesByBatchAndSemIds(batchId, { semId }),
    enabled: !!batchId && !!semId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setNotes(data.notes);
    }
  }, [isSuccess, data]);
};
