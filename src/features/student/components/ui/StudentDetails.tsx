// external import
import { useEffect, useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Student } from "../../pages/FilteredStudents";

interface StudentDetailProps {
  student: Student;
  onStatusChange: (id: number, newStatus: string) => void;
}

function StudentDetails({ student, onStatusChange }: StudentDetailProps) {
  const [status, setStatus] = useState(student.status);

  useEffect(() => {
    if (student) {
      setStatus(student.status);
    }
  }, [student]);

  const handleStatusUpdate = () => {
    onStatusChange(student.id, status);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg  ">{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex gap-2">
            <dt className="font-semibold ">Roll No:</dt>
            <dd>{student.rollNo}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold ">Registration No:</dt>
            <dd>{student.registrationNo}</dd>
          </div>

          <div className="flex gap-2">
            <dt className="font-semibold">Current Status:</dt>
            <dd>
              <Badge
                variant={
                  student.status === "regular"
                    ? "default"
                    : student.status === "suspend"
                    ? "outline"
                    : "destructive"
                }
              >
                {student.status}
              </Badge>
            </dd>
          </div>
          <div className="pt-4">
            <dt className="font-semibold mb-2">Change Status:</dt>
            <dd>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="suspend">Suspend</SelectItem>
                  <SelectItem value="block">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </dd>
          </div>
          <div className="pt-2">
            <Button
              onClick={handleStatusUpdate}
              disabled={status === student.status}
            >
              Update Status
            </Button>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

// export
export default StudentDetails;
