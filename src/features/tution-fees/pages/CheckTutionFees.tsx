// external import
import { useState } from "react";

// internal import
import FeeFilter, { IFilter } from "../components/ui/FeeFilter";
import FilteredList from "../components/ui/FilteredList";
import VerifyCard from "../components/ui/VerifyCard";
import Container from "@/components/shared/Container";

export interface IStudent {
  id: string;
  name: string;
  department: string;
  course: string;
  semester: number;
  rollNumber: string;
  registrationNumber: string;
}

export interface ITuitionTransaction {
  id: string;
  studentId: string;
  utrNo: string;
  semester: number;
  amount: number;
  date: string;
  status: "verified" | "checking";
}

const students: IStudent[] = [
  {
    id: "1",
    name: "Alice Johnson",
    department: "Computer Science",
    course: "B.Tech",
    semester: 3,
    rollNumber: "CS001",
    registrationNumber: "REG001",
  },
  {
    id: "2",
    name: "Bob Smith",
    department: "Electrical Engineering",
    course: "B.E.",
    semester: 5,
    rollNumber: "EE001",
    registrationNumber: "REG002",
  },
  {
    id: "3",
    name: "Charlie Brown",
    department: "Mechanical Engineering",
    course: "B.Tech",
    semester: 2,
    rollNumber: "ME001",
    registrationNumber: "REG003",
  },
  {
    id: "4",
    name: "Diana Prince",
    department: "Computer Science",
    course: "M.Tech",
    semester: 1,
    rollNumber: "CS002",
    registrationNumber: "REG004",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    department: "Electrical Engineering",
    course: "B.E.",
    semester: 4,
    rollNumber: "EE002",
    registrationNumber: "REG005",
  },
];

const tuitionTransactions: ITuitionTransaction[] = [
  {
    id: "t1",
    studentId: "1",
    utrNo: "UTR001",
    semester: 1,
    amount: 50000,
    date: "2023-01-15",
    status: "verified",
  },
  {
    id: "t2",
    studentId: "1",
    utrNo: "UTR002",
    semester: 2,
    amount: 50000,
    date: "2023-06-20",
    status: "verified",
  },
  {
    id: "t3",
    studentId: "1",
    utrNo: "UTR003",
    semester: 3,
    amount: 50000,
    date: "2023-12-10",
    status: "checking",
  },
  {
    id: "t4",
    studentId: "2",
    utrNo: "UTR004",
    semester: 4,
    amount: 45000,
    date: "2023-01-05",
    status: "verified",
  },
  {
    id: "t5",
    studentId: "2",
    utrNo: "UTR005",
    semester: 5,
    amount: 45000,
    date: "2023-06-15",
    status: "checking",
  },
  {
    id: "t6",
    studentId: "3",
    utrNo: "UTR006",
    semester: 1,
    amount: 48000,
    date: "2023-01-20",
    status: "verified",
  },
  {
    id: "t7",
    studentId: "3",
    utrNo: "UTR007",
    semester: 2,
    amount: 48000,
    date: "2023-06-25",
    status: "verified",
  },
  {
    id: "t8",
    studentId: "4",
    utrNo: "UTR008",
    semester: 1,
    amount: 60000,
    date: "2023-07-01",
    status: "checking",
  },
  {
    id: "t9",
    studentId: "5",
    utrNo: "UTR009",
    semester: 3,
    amount: 45000,
    date: "2023-01-10",
    status: "verified",
  },
  {
    id: "t10",
    studentId: "5",
    utrNo: "UTR010",
    semester: 4,
    amount: 45000,
    date: "2023-06-30",
    status: "verified",
  },
];

const CheckTutionFees = () => {
  const [filteredStudents, setFilteredStudents] =
    useState<IStudent[]>(students);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [recentTransaction, setRecentTransaction] =
    useState<ITuitionTransaction | null>(null);

  const applyFilters = (filters: IFilter) => {
    const filtered = students.filter(
      (student) =>
        (!filters.department || student.department === filters.department) &&
        (!filters.course || student.course === filters.course) &&
        (!filters.semester || student.semester === parseInt(filters.semester))
    );
    setFilteredStudents(filtered);
    setSelectedStudent(null);
    setRecentTransaction(null);
  };

  const handleStudentClick = (student: IStudent) => {
    setSelectedStudent(student);
    const studentTransactions = tuitionTransactions.filter(
      (t) => t.studentId === student.id
    );
    const mostRecent = studentTransactions.reduce((latest, current) =>
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
    setRecentTransaction(mostRecent);
  };

  const handleStatusChange = (newStatus: "verified" | "checking") => {
    if (recentTransaction) {
      setRecentTransaction((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };
  return (
    <>
      <Container>
        <FeeFilter onFilter={applyFilters} />

        <div className="grid grid-cols-3 gap-8">
          <FilteredList
            students={filteredStudents}
            onStudentClick={handleStudentClick}
          />

          {selectedStudent && recentTransaction && (
            <VerifyCard
              name={selectedStudent.name}
              transaction={recentTransaction}
              handleStatus={handleStatusChange}
            />
          )}
        </div>
      </Container>
    </>
  );
};

// export
export default CheckTutionFees;
