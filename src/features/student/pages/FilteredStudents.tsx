// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import Filter from "../components/ui/Filter";
import StudentsTable from "../components/ui/StudentsTable";
import StudentDetails from "../components/ui/StudentDetails";
import Container from "@/components/shared/Container";
import { getStudentByIdSelector } from "../recoil/studentSelector";

const FilteredStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const selStudentInfo = useRecoilValue(
    getStudentByIdSelector(selectedStudent)
  );

  const handleStudentClick = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleDelete = () => {};

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      <Filter />

      <div className="flex mt-4">
        <div className="w-2/3 pr-4">
          <StudentsTable
            onStudentClick={handleStudentClick}
            onDelete={handleDelete}
          />
        </div>
        <div className="w-1/3">
          {selStudentInfo && <StudentDetails student={selStudentInfo} />}
        </div>
      </div>
    </Container>
  );
};

// export
export default FilteredStudents;
