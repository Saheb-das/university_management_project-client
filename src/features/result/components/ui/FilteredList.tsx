import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStudent } from "../../pages/Result";

interface IFilteredStudent {
  students: IStudent[];
  onClick: (studnet: IStudent) => void;
}

const FilteredList = ({ students, onClick }: IFilteredStudent) => {
  return (
    <div className="col-span-8 bg-background text-foreground p-4">
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="capitalize text-base">
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Registration No</TableHead>
              <TableHead>semester</TableHead>
              <TableHead>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                onClick={() => onClick(student)}
                className="cursor-pointer text-base"
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.regNo}</TableCell>
                {/* TODO: here some data field will be updated */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FilteredList;
