// external import
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBatches } from "@/hooks/useBatches";
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useSubjectsBySemId } from "@/hooks/useSubjectsBySemId";
import { useParams } from "react-router";
import { useCreateAsignTeacher } from "../../hooks/useCreateAsignTeacher";
import { TAsignTeacherBody } from "../../types/asign-teacher";
import { toast } from "sonner";

export type TDegreeData = {
  bachelor: { department: string; semester: number }[];
  master: { department: string; semester: number }[];
  phd: { department: string; semester: number | string }[];
  diploma: { department: string; semester: number }[];
};

function AssignToDept() {
  const { teacherId } = useParams();

  if (!teacherId) return;

  const [batchId, setBatchId] = useState<string>("");
  const [semId, setSemId] = useState<string>("");
  const [subId, setSubId] = useState("");

  const { data: batchData, isSuccess: isBatchSuccess } = useBatches();
  const { data: semData, isSuccess: isSemSuccess } =
    useSemestersByBatchId(batchId);
  const { data: subData, isSuccess: isSubSuccess } = useSubjectsBySemId(semId);

  const { mutate, isPending } = useCreateAsignTeacher(teacherId);

  const handleAsign = () => {
    const batch =
      batchData && batchData.batches.find((item) => item.id === batchId);

    if (!batch) return;

    const payload: TAsignTeacherBody = {
      batchName: batch.name,
      semester: semId,
      subject: subId,
    };

    mutate(payload, {
      onSuccess: (res) => {
        if (!res) return res;

        const asigned = res.asigned;
        if (asigned) {
          toast.success(res.message || "asign successfull");
        }
      },
      onError: (err) => {
        toast.error(err.message || "asign failed");
      },
      onSettled: () => {
        setBatchId("");
        setSemId("");
        setSubId("");
      },
    });
  };

  return (
    <div className="bg-background text-foreground shadow-lg rounded-xl p-6 space-y-5 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center ">
        Assign Teacher to Department
      </h2>

      {/* Select Batch */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          Batch Name
        </Label>
        <Select value={batchId} onValueChange={setBatchId}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Batch" />
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
      </div>

      {/* Select Semester */}
      <div>
        <Label className="text-sm font-medium text-foreground">Semester</Label>
        <Select value={semId} onValueChange={setSemId} disabled={!batchId}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {batchId &&
              isSemSuccess &&
              semData &&
              semData.batchSemDetails.course.semesters.length > 0 &&
              semData.batchSemDetails.course.semesters.map((sem) => (
                <SelectItem key={sem.id} value={sem.id}>
                  Semester {sem.semNo}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Subject */}
      <div>
        <Label className="text-sm font-medium text-foreground">Subject</Label>
        <Select
          value={subId}
          onValueChange={setSubId}
          disabled={!batchId || !semId}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {batchId &&
              semId &&
              isSubSuccess &&
              subData &&
              subData.subjects.length > 0 &&
              subData.subjects.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  {sub.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Assign Button */}
      <Button
        onClick={handleAsign}
        disabled={!batchId || !subId || !semId}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
      >
        {isPending ? "Asigning..." : "Assign Teacher"}
      </Button>
    </div>
  );
}

export default AssignToDept;
