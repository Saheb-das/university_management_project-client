// external import
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartments } from "@/hooks/useDepartment";
import { departmentsWithDegreesAtom } from "@/recoil/atoms/filterAtom";
import { useBatchesByDeptAndDegIds } from "@/hooks/useBatchesByDeptAndDegIds";
import { useStudentsByBatchId } from "../../hooks/useStudentsByBatchId";
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useSubjectsBySemId } from "@/hooks/useSubjectsBySemId";
import { subjectsBySemesterAtom } from "../../recoil/resultAtom";
import { ISemester } from "../../types/result";

export type TFilters = {
  degId: string;
  deptId: string;
  batchId: string;
  semId: string;
};

interface Props {
  onSemester: (sem: ISemester) => void;
}

const ResultFilter = ({ onSemester }: Props) => {
  // state
  const setSubjects = useSetRecoilState(subjectsBySemesterAtom);
  const [batch, setBatch] = useState("");
  const [filters, setFilters] = useState<TFilters>({
    degId: "",
    deptId: "",
    batchId: "",
    semId: "",
  });
  const departmentsInfo = useRecoilValue(departmentsWithDegreesAtom);

  // API hooks
  useDepartments("degree");

  useStudentsByBatchId(batch);

  const { data, isSuccess } = useBatchesByDeptAndDegIds(
    filters.deptId,
    filters.degId
  );

  const { data: semData, isSuccess: isSemSuccess } = useSemestersByBatchId(
    filters.batchId
  );

  const { data: subjData, isSuccess: isSubjSuccess } = useSubjectsBySemId(
    filters.semId
  );
  useEffect(() => {
    if (isSubjSuccess && subjData) {
      setSubjects(subjData.subjects);
    }
  }, [isSubjSuccess, subjData]);

  let degreesInfo =
    departmentsInfo &&
    departmentsInfo.find((item) => item.id === filters.deptId)?.degrees;

  // handler function
  const handleFilterChange = (filter: keyof TFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleStudent = () => {
    const sem =
      semData &&
      semData.batchSemDetails.course.semesters.find(
        (item) => item.id === filters.semId
      );
    if (!sem) return;

    onSemester(sem);
    setBatch(filters.batchId);
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg px-5 py-3 mb-4">
      <div className=" grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label className="text-base" htmlFor="department">
            Department
          </Label>
          <Select
            onValueChange={(value) => handleFilterChange("deptId", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="department">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departmentsInfo &&
                departmentsInfo.length > 0 &&
                departmentsInfo.map((dept) => (
                  <SelectItem
                    className="capitalize"
                    key={dept.id}
                    value={dept.id}
                  >
                    {dept.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base" htmlFor="degree">
            Degree
          </Label>
          <Select onValueChange={(value) => handleFilterChange("degId", value)}>
            <SelectTrigger className="mt-2 w-full" id="degree">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              {degreesInfo &&
                degreesInfo.map((deg) => (
                  <SelectItem
                    className="capitalize"
                    key={deg.id}
                    value={deg.id}
                  >
                    {deg.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base" htmlFor="batch">
            Batch
          </Label>
          <Select
            disabled={!filters.degId}
            onValueChange={(value) => handleFilterChange("batchId", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="Batch">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              {isSuccess &&
                data &&
                data.batches.length > 0 &&
                data.batches.map((batch) => (
                  <SelectItem
                    className="capitalize"
                    key={batch.id}
                    value={batch.id}
                  >
                    {batch.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base" htmlFor="semester">
            Semester
          </Label>
          <Select
            disabled={!filters.batchId}
            onValueChange={(value) => handleFilterChange("semId", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="semester">
              <SelectValue placeholder="Select Semester" />
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
        </div>
      </div>
      <Button onClick={handleStudent}>Get Students</Button>
    </div>
  );
};

export default ResultFilter;
