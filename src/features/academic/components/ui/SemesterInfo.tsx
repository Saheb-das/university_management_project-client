// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  subjectsWithTeacherSelector,
  transformResultDetailsSelector,
} from "../../recoil/academicSelector";
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";
import { useResultBySemBatchStudentIds } from "../../hooks/useResultBySemBatchStudentIds";

const SemesterInfo = () => {
  const subWithTeacher = useRecoilValue(subjectsWithTeacherSelector);
  const studentInfo = useRecoilValue(studentUserAtom);
  const [selSem, setSelSem] = useState("");

  useResultBySemBatchStudentIds(selSem, studentInfo.batchId, studentInfo.id);
  const { data: semData, isSuccess: isSemSuccess } = useSemestersByBatchId(
    studentInfo.batchId
  );
  const resultInfo = useRecoilValue(transformResultDetailsSelector);

  return (
    <div className="space-y-6">
      {/* subject information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-primary">
            Subject Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {subWithTeacher &&
              subWithTeacher.length > 0 &&
              subWithTeacher.map((sub, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{sub.subName}</span> -{" "}
                  {sub.teacher}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      {/* show result by semester */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-primary">
            Semester Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selSem} onValueChange={setSelSem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {isSemSuccess &&
                  semData &&
                  semData.batchSemDetails.course.semesters.length > 0 &&
                  semData.batchSemDetails.course.semesters.map((sem) => (
                    <SelectItem key={sem.id} value={sem.id}>
                      sem - {sem.semNo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>1st Internal</TableHead>
                <TableHead>2nd Internal</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Lab/Assignment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultInfo.length > 0 ? (
                resultInfo.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.subject}</TableCell>
                    <TableCell>{result.firstInternal}</TableCell>
                    <TableCell>{result.secondInternal}</TableCell>
                    <TableCell>{result.final}</TableCell>
                    <TableCell>{result.lab}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>There are no results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// export
export default SemesterInfo;
