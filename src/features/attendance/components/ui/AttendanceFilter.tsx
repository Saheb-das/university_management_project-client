// external import
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBatchesByTeacherUserId } from "@/hooks/useBatchesByTeacherUserId";
import { getUniqueAsignBatch } from "@/features/studyroom/utils/util";
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useSubjectsBySemId } from "@/hooks/useSubjectsBySemId";
import { useStudentsByBatchId } from "@/features/result/hooks/useStudentsByBatchId";

export interface IFilters {
  batch: string;
  semester: string;
  subject: string;
}

interface AttendanceFormProps {
  onGetStudents: (filters: IFilters) => void;
  isSubmit: boolean;
}

function AttendanceFilter({ isSubmit, onGetStudents }: AttendanceFormProps) {
  const { userId } = useParams();
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [selBatch, setSelBatch] = useState("");

  const { data: asignWithBatchesdata } = useBatchesByTeacherUserId(
    userId || ""
  );
  const { data: semData, isSuccess: isSemSuccess } =
    useSemestersByBatchId(batch);

  const { data: subData, isSuccess: isSubSuccess } =
    useSubjectsBySemId(semester);

  const uniqueBatches =
    asignWithBatchesdata && getUniqueAsignBatch(asignWithBatchesdata.batches);

  useStudentsByBatchId(selBatch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStudents({ semester, batch, subject });
    setSelBatch(batch);
  };

  useEffect(() => {
    if (isSubmit) {
      setBatch("");
      setSemester("");
      setSubject("");
      setSelBatch("");
    }
  }, [isSubmit]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Attendance Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* batch */}
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger id="batch" className="w-full">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueBatches &&
                    uniqueBatches.length > 0 &&
                    uniqueBatches.map((item) => (
                      <SelectItem
                        key={item.batchId}
                        value={item.batchId}
                        className="capitalize"
                      >
                        {item.batch.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* semester */}
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                disabled={!batch}
                value={semester}
                onValueChange={setSemester}
              >
                <SelectTrigger id="semester" className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {isSemSuccess &&
                    semData &&
                    semData.batchSemDetails.course.semesters.length > 0 &&
                    semData.batchSemDetails.course.semesters.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        Semester {item.semNo}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                disabled={!semester}
                value={subject}
                onValueChange={setSubject}
              >
                <SelectTrigger id="subject" className="w-full">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {isSubSuccess &&
                    subData &&
                    subData.subjects.length > 0 &&
                    subData.subjects.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                        className="capitalize"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Get Students</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// export
export default AttendanceFilter;
