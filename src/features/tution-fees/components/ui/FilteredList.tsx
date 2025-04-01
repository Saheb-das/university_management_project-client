import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStudent } from "../../pages/CheckTutionFees";

interface IFilteredList {
  students: IStudent[];
  onStudentClick: (student: IStudent) => void;
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
                    onClick={() => onStudentClick(student)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.registrationNumber}</TableCell>
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
