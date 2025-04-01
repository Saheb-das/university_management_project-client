import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Student } from "../../pages/FilteredStudents";

interface StudentTableProps {
  students: Student[];
  onStudentClick: (studentId: number) => void;
  onDelete: (id: number) => void;
}

const StudentsTable = ({
  students,
  onStudentClick,
  onDelete,
}: StudentTableProps) => {
  const [searchRollNo, setSearchRollNo] = useState("");

  const filteredStudents = students.filter((student) =>
    student.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
  );

  const coloredStatus = (status: string) => {
    switch (status) {
      case "regular":
        return "text-green-500";

      case "suspend":
        return "text-yellow-500";

      case "block":
        return "text-red-500";

      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-background text-foreground py-4 px-3">
      <Input
        type="text"
        placeholder="Search by Roll No"
        value={searchRollNo}
        onChange={(e) => setSearchRollNo(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Registration No</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow
              key={student.id}
              onClick={() => onStudentClick(student.id)}
              className="cursor-pointer"
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.rollNo}</TableCell>
              <TableCell>{student.registrationNo}</TableCell>
              <TableCell
                className={`${coloredStatus(student.status)} font-medium`}
              >
                {student.status}
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(student.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
