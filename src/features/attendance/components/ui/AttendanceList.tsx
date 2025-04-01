// external import
import { useState } from "react";

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

export interface IStudent {
  id: number;
  name: string;
  rollNumber: string;
  registrationNumber: string;
}

interface StudentListProps {
  students: IStudent[];
}

function AttendanceList({ students }: StudentListProps) {
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});

  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
    setAttendance((prev) => ({ ...prev, [studentId]: isPresent }));
  };

  const handleSubmitAttendance = () => {
    // In a real application, this would be an API call to save the attendance
    console.log("Attendance submitted:", attendance);
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
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.registrationNumber}</TableCell>
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
        <Button className="mt-4" onClick={handleSubmitAttendance}>
          Submit Attendance
        </Button>
      </CardContent>
    </Card>
  );
}

// export
export default AttendanceList;
