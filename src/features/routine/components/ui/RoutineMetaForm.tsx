// external import
import { Control, Controller, FieldErrors } from "react-hook-form";

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
import { BatchId, FormValues } from "../../pages/Routine";
import { useState } from "react";

const semesters: Record<BatchId, Array<{ id: string; name: string }>> = {
  b1: [
    { id: "s1", name: "Semester 1" },
    { id: "s2", name: "Semester 2" },
  ],
  b2: [{ id: "s3", name: "Semester 3" }],
};

const batches = [
  { id: "b1", name: "Batch A" },
  { id: "b2", name: "Batch B" },
] as const;

interface IRoutineMetaProps {
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
}

const RoutineMetaForm = ({ control, errors }: IRoutineMetaProps) => {
  const [selectedBatch, setSelectedBatch] = useState<BatchId | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Class Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Controller
              control={control}
              name="batchId"
              render={({ field }) => (
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedBatch(val as BatchId);
                  }}
                  value={field.value}
                >
                  <SelectTrigger id="batch" className="w-full">
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.batchId && (
              <p className="text-destructive text-sm mt-1">
                {errors.batchId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Controller
              control={control}
              name="semesterId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedBatch}
                >
                  <SelectTrigger id="semester" className="w-full">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedBatch &&
                      semesters[selectedBatch]?.map((sem) => (
                        <SelectItem key={sem.id} value={sem.id}>
                          {sem.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.semesterId && (
              <p className="text-destructive text-sm mt-1">
                {errors.semesterId.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoutineMetaForm;
