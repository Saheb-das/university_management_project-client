// external import
import { useRecoilValue } from "recoil";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studentsListByBatchAtom } from "../../recoil/resultAtom";

// types import
import { ISemester } from "../../types/result";

interface IFilteredStudent {
  selectSem: ISemester;
  onStudentInfo: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}

const FilteredList = ({ selectSem, onStudentInfo }: IFilteredStudent) => {
  const studentsInfo = useRecoilValue(studentsListByBatchAtom);

  const handleClick = (id: string, name: string) => {
    onStudentInfo((prev) => ({ ...prev, id, name }));
  };
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsInfo &&
              studentsInfo.map((student) => (
                <TableRow
                  key={student.id}
                  onClick={() =>
                    handleClick(
                      student.id,
                      `${student.profile.user.firstName} ${student.profile.user.lastName}`
                    )
                  }
                  className="cursor-pointer text-base"
                >
                  <TableCell>
                    {student.profile.user.firstName}{" "}
                    {student.profile.user.lastName}
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.registretionNo}</TableCell>
                  <TableCell>{selectSem.semNo}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FilteredList;
