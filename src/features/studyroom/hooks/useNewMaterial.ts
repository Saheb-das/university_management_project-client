// external import
import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

// internal import
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useSubjectsBySemId } from "@/hooks/useSubjectsBySemId";
import { useUploadDoc } from "./useUploadDoc";
import { useCreateNewMaterial } from "./useCreateNewMaterial";
import { useBatchesByTeacherUserId } from "./useBatchesByTeacherUserId";
import { asignsWithBatchAtom } from "../recoil/studyroomAtom";

export const useNewMaterial = () => {
  const { userId } = useParams();
  const asignsWithBatchInfo = useRecoilValue(asignsWithBatchAtom);

  const [isConfirm, setIsConfirm] = useState(false);
  const [filter, setFilter] = useState({
    batch: "",
    sem: "",
    sub: "",
    filePath: "",
  });
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useBatchesByTeacherUserId(userId!);
  const { data: semData } = useSemestersByBatchId(filter.batch);
  const { data: subData } = useSubjectsBySemId(filter.sem);

  const { mutate: uploadDocMutate, isPending } = useUploadDoc();
  const { mutate: materialMutate, isPending: materialIsPending } =
    useCreateNewMaterial();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const getSelections = () => {
    const asignWithBatch = asignsWithBatchInfo.find(
      (b) => b.batch.id === filter.batch
    );
    const sem = semData?.batchSemDetails.course.semesters.find(
      (s) => s.id === filter.sem
    );
    const sub = subData?.subjects.find((s) => s.id === filter.sub);
    return { asignWithBatch, sem, sub };
  };

  return {
    filter,
    setFilter,
    isConfirm,
    setIsConfirm,
    title,
    setTitle,
    file,
    setFile,
    getSelections,
    uploadDocMutate,
    materialMutate,
    isPending,
    materialIsPending,
    handleFileChange,
    asignsWithBatchInfo,
    semData,
    subData,
  };
};
