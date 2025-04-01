// external import
import { useEffect, useState } from "react";

// internal import
import Filter from "../components/ui/Filter";
import StudentsTable from "../components/ui/StudentsTable";
import StudentDetails from "../components/ui/StudentDetails";
import Container from "@/components/shared/Container";

// internal import

export interface Student {
  id: number;
  name: string;
  rollNo: string;
  registrationNo: string;
  status: string;
}

const initStudentsSearch = [
  {
    id: 1,
    name: "John Doe",
    rollNo: "CS2001",
    registrationNo: "REG001",
    status: "regular",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNo: "CS2002",
    registrationNo: "REG002",
    status: "block",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rollNo: "CS2003",
    registrationNo: "REG003",
    status: "suspend",
  },
];

const FilteredStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (selectedStudent) {
      const updatedStudent = students.find(
        (student) => student.id === selectedStudent.id
      );
      setSelectedStudent(updatedStudent!);
    }
  }, [students]);

  const handleSearch = (
    department: string,
    degree: string,
    admissionYear: string
  ) => {
    // TODO: api call to get students
    setStudents(initStudentsSearch);
  };

  const handleStudentClick = (studentId: number) => {
    // TODO: API call for single student by student-id
    const student = initStudentsSearch.find((item) => item.id === studentId);
    setSelectedStudent(student || null);
  };

  const handleStatusChange = (studentId: number, newStatus: string) => {
    // TODO: API call to update student status
    const updatedStudents = students.map((item) =>
      item.id === studentId ? { ...item, status: newStatus } : item
    );

    setStudents(updatedStudents);
  };

  const handleDelete = () => {};

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <Filter onSearch={handleSearch} />
      <div className="flex mt-4">
        <div className="w-2/3 pr-4">
          <StudentsTable
            students={students}
            onStudentClick={handleStudentClick}
            onDelete={handleDelete}
          />
        </div>
        <div className="w-1/3">
          {selectedStudent && (
            <StudentDetails
              student={selectedStudent}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

// export
export default FilteredStudents;
