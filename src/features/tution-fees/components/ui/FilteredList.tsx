import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStudent } from "@/features/result/types/result";

interface IFilteredList {
  students: IStudent[];
  onStudentClick: (studentId: string) => void;
}

const FilteredList = ({ students, onStudentClick }: IFilteredList) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Student List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Registration Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students &&
                students.map((student) => (
                  <TableRow
                    key={student.id}
                    onClick={() => onStudentClick(student.id)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>
                      {student?.profile?.user?.firstName}{" "}
                      {student?.profile?.user?.lastName}
                    </TableCell>
                    <TableCell>{student?.department?.type}</TableCell>
                    <TableCell>{student?.course?.name}</TableCell>
                    <TableCell>{student?.rollNo}</TableCell>
                    <TableCell>{student.registretionNo}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilteredList;
