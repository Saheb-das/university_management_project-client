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
import { useRecoilValue } from "recoil";
import { studentsListAtom } from "../../recoil/studentAtom";

interface StudentTableProps {
  onStudentClick: (studentId: string) => void;
  onDelete: (id: string) => void;
}

const StudentsTable = ({ onStudentClick, onDelete }: StudentTableProps) => {
  const studentsInfo = useRecoilValue(studentsListAtom);
  const [searchRollNo, setSearchRollNo] = useState("");

  // TODO: search functionality added later
  const filteredStudents = studentsInfo.filter((student) =>
    student.rollNo?.toLowerCase().includes(searchRollNo.toLowerCase())
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
          {studentsInfo &&
            studentsInfo.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onStudentClick(item.id)}
                className="cursor-pointer"
              >
                <TableCell>
                  {item.profile.user.firstName} {item.profile.user.lastName}
                </TableCell>
                <TableCell>{item.rollNo}</TableCell>
                <TableCell>{item.registretionNo}</TableCell>
                <TableCell
                  className={`${coloredStatus(
                    item.profile.user.activeStatus
                  )} font-medium`}
                >
                  {item.profile.user.activeStatus}
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
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
