// external import
import { useState } from "react";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useRoutine } from "../../hooks/useRoutine";
import { useBatches } from "@/hooks/useBatches";

const BatchFilter = () => {
  const [info, setInfo] = useState({
    batchId: "",
    batchName: "",
    semId: "",
  });

  const [selInfo, setSelInfo] = useState({
    batchName: "",
    semId: "",
  });

  const { data: batchData, isSuccess: isBatchSuccess } = useBatches();
  const { data: semData, isSuccess: isSemSuccess } = useSemestersByBatchId(
    info.batchId
  );
  // TODO: BATCH NAME AND BATCH ID
  useRoutine(selInfo.batchName, selInfo.semId);

  const handleClick = () => {
    setSelInfo((prev) => ({
      ...prev,
      batchName: info.batchName,
      semId: info.semId,
    }));
  };

  const handleBatch = (val: string) => {
    const batch = batchData?.batches.find((item) => item.id === val);

    if (!batch) return;

    setInfo((prev) => ({ ...prev, batchId: batch.id, batchName: batch.name }));
  };

  return (
    <div className="w-[50%] mb-6 flex items-center gap-4">
      <Select value={info.batchId} onValueChange={handleBatch}>
        <SelectTrigger className="w-[60%]">
          <SelectValue placeholder="select batch name" />
        </SelectTrigger>
        <SelectContent>
          {isBatchSuccess &&
            batchData &&
            batchData.batches.length > 0 &&
            batchData.batches.map((batch) => (
              <SelectItem key={batch.id} value={batch.id}>
                {batch.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        value={info.semId}
        onValueChange={(v) => setInfo((p) => ({ ...p, semId: v }))}
      >
        <SelectTrigger className="w-[60%]">
          <SelectValue placeholder="select batch name" />
        </SelectTrigger>
        <SelectContent>
          {isSemSuccess &&
            semData &&
            semData.batchSemDetails.course.semesters.length > 0 &&
            semData.batchSemDetails.course.semesters.map((sem) => (
              <SelectItem key={sem.id} value={sem.id}>
                semester {sem.semNo}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Button
        variant={"secondary"}
        className="cursor-pointer"
        onClick={handleClick}
      >
        Get Routine
      </Button>
    </div>
  );
};

// export
export default BatchFilter;
