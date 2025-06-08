// external import
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IFilters } from "./AttendanceFilter";
import { studentsListByBatchAtom } from "@/features/result/recoil/resultAtom";
import { makeAttendanceSheet } from "../../utils/util";
import { useCreateAttendances } from "../../hook/useCreateAttendances";
import { toast } from "sonner";

interface StudentListProps {
  filter: IFilters;
  onSubmit: React.Dispatch<SetStateAction<boolean>>;
}

function AttendanceList({ onSubmit, filter }: StudentListProps) {
  const [studentsInfo, setStudentsInfo] = useRecoilState(
    studentsListByBatchAtom
  );

  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const { mutate, isPending } = useCreateAttendances(filter);

  useEffect(() => {
    if (studentsInfo.length > 0) {
      const sheet = makeAttendanceSheet(studentsInfo);
      setAttendance(sheet);
    }
  }, [studentsInfo]);

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance((prev) => ({ ...prev, [studentId]: isPresent }));
  };

  const handleSubmitAttendance = () => {
    mutate(attendance, {
      onSuccess: (res) => {
        if (!res) return res;

        if (res.newAttendances.length > 0) {
          toast.success(res.message || "attendance submitted");
          onSubmit(true);
        }
      },
      onError: (err) => {
        toast.error(err.message || "attendance submition failed");
      },
      onSettled: () => {
        setAttendance({});
        setStudentsInfo([]);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsInfo &&
              studentsInfo.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    {student.profile.user.firstName}{" "}
                    {student.profile.user.lastName}
                  </TableCell>
                  <TableCell>{student.rollNo || "Not Provided"}</TableCell>
                  <TableCell>
                    {student.registretionNo || "Not Provided"}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendance[student.id] || false}
                      onCheckedChange={(checked) =>
                        handleAttendanceChange(student.id, checked as boolean)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button
          disabled={isPending}
          className="mt-4"
          onClick={handleSubmitAttendance}
        >
          {isPending ? "Submitting..." : "Submit Attendance"}
        </Button>
      </CardContent>
    </Card>
  );
}

// export
export default AttendanceList;
