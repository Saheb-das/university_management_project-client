// internal import
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResultFilter, { TFilters } from "../components/ui/ResultFilter";
import FilteredList from "../components/ui/FilteredList";
import MarksInput from "../components/shared/MarksInput";
import Container from "@/components/shared/Container";

// dummy data
export const students = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "A001",
    regNo: "REG001",
    degree: "BSc",
    department: "Computer Science",
    semester: 1,
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "A002",
    regNo: "REG002",
    degree: "BA",
    department: "English",
    semester: 2,
  },
  {
    id: 3,
    name: "Charlie Brown",
    rollNo: "A003",
    regNo: "REG003",
    degree: "BEng",
    department: "Mechanical",
    semester: 1,
  },
  {
    id: 4,
    name: "Diana Prince",
    rollNo: "A004",
    regNo: "REG004",
    degree: "BSc",
    department: "Physics",
    semester: 3,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    rollNo: "A005",
    regNo: "REG005",
    degree: "BA",
    department: "History",
    semester: 2,
  },
];

export const subjects = [
  {
    id: 1,
    name: "Introduction to Programming",
    semester: 1,
    department: "Computer Science",
  },
  { id: 2, name: "English Literature", semester: 2, department: "English" },
  { id: 3, name: "Mechanics", semester: 1, department: "Mechanical" },
  { id: 4, name: "Quantum Physics", semester: 3, department: "Physics" },
  { id: 5, name: "World History", semester: 2, department: "History" },
];

export interface IStudent {
  id: number;
  name: string;
  rollNo: string;
  regNo: string;
  degree: string;
  department: string;
  semester: number;
}

export interface ISubject {
  id: number;
  name: string;
  semester: number;
  department: string;
}

export type TMarks = Record<number, Record<number, string>>;

function Result() {
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [marks, setMarks] = useState<TMarks>({});

  const getStudents = (filters: TFilters) => {
    const filtered = students.filter(
      (student) =>
        (!filters.degree || student.degree === filters.degree) &&
        (!filters.department || student.department === filters.department) &&
        (!filters.semester || student.semester === parseInt(filters.semester))
    );
    setFilteredStudents(filtered);
    setSelectedStudent(null);
  };

  const handleMarkChange = (subjectId: number, value: string) => {
    if (selectedStudent) {
      setMarks((prev) => ({
        ...prev,
        [selectedStudent.id]: {
          ...prev[selectedStudent.id],
          [subjectId]: value,
        },
      }));
    }
  };

  const handleStudentClick = (student: IStudent) => {
    setSelectedStudent(student);
    if (!marks[student.id]) {
      const studentSubjects = subjects.filter(
        (subject) =>
          subject.department === student.department &&
          subject.semester === student.semester
      );
      const initialMarks: Record<number, string> = {};
      studentSubjects.forEach((subject) => {
        initialMarks[subject.id] = "";
      });
      setMarks((prev) => ({ ...prev, [student.id]: initialMarks }));
    }
  };

  const handleSubmit = () => {
    if (selectedStudent) {
      console.log("Submitted marks:", marks[selectedStudent.id]);
      // Here you would typically send this data to your backend
    }
  };
  return (
    <>
      <Container>
        {/* filter component */}
        <ResultFilter onStudent={getStudents} />

        <div className="grid grid-cols-12 gap-4">
          {/* student list table  */}
          <FilteredList
            students={filteredStudents}
            onClick={handleStudentClick}
          />

          {selectedStudent && (
            // marks input component
            <div className="col-span-4 bg-background text-foreground p-4">
              <h2 className="text-xl font-bold mb-2">
                {selectedStudent.name}'s Subjects
              </h2>
              {subjects
                .filter(
                  (subject) =>
                    subject.department === selectedStudent.department &&
                    subject.semester === selectedStudent.semester
                )
                .map((subject) => (
                  <MarksInput
                    subject={subject}
                    student={selectedStudent}
                    marks={marks}
                    onMarks={handleMarkChange}
                  />
                ))}
              <Button onClick={handleSubmit} className="mt-4">
                Submit Marks
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

// export
export default Result;
