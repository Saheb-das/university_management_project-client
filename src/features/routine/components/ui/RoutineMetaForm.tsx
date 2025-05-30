// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSemestersByBatchId } from "../../hooks/useSemestersByBatchId";
import { useBatches } from "../../hooks/useBatches";

// types import
import { IFormValues } from "../../pages/RoutineCreator";
import { useSubjectsBySemId } from "../../hooks/useSubjectsBySemId";

interface RoutineMetaFormProps {
  formData: IFormValues;
  setFormData: React.Dispatch<React.SetStateAction<IFormValues>>;
  errors: Record<string, string>;
}

const RoutineMetaForm = ({
  formData,
  setFormData,
  errors,
}: RoutineMetaFormProps) => {
  const { data: batchData, isSuccess: isBatchSuccess } = useBatches();
  const { data: semData, isSuccess: isSemSuccess } = useSemestersByBatchId(
    formData.batchId
  );

  useSubjectsBySemId(formData.semesterId);

  const handleBatchChange = (batchId: string) => {
    setFormData((prev) => ({
      ...prev,
      batchId,
      semesterId: "", // Reset semester when batch changes
    }));
  };

  const handleSemesterChange = (semesterId: string) => {
    setFormData((prev) => ({
      ...prev,
      semesterId,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Class Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Select onValueChange={handleBatchChange} value={formData.batchId}>
              <SelectTrigger id="batch" className="w-full">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                {batchData &&
                  batchData.batches.length > 0 &&
                  isBatchSuccess &&
                  batchData.batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.batchId && (
              <p className="text-destructive text-sm mt-1">{errors.batchId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              onValueChange={handleSemesterChange}
              value={formData.semesterId}
              disabled={!formData.batchId}
            >
              <SelectTrigger id="semester" className="w-full">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {formData.batchId &&
                  semData &&
                  isSemSuccess &&
                  semData.batchSemDetails.course.semesters.length > 0 &&
                  semData.batchSemDetails.course.semesters.map((sem) => (
                    <SelectItem key={sem.id} value={sem.id}>
                      semester {sem.semNo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.semesterId && (
              <p className="text-destructive text-sm mt-1">
                {errors.semesterId}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoutineMetaForm;
