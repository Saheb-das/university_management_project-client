// external import
import { useState } from "react";

// internal import
import AttendanceFilter, { IFilters } from "../components/ui/AttendanceFilter";
import AttendanceList, { IStudent } from "../components/ui/AttendanceList";
import Container from "@/components/shared/Container";

const dummyStudents: IStudent[] = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "001",
    registrationNumber: "REG001",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "002",
    registrationNumber: "REG002",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rollNumber: "003",
    registrationNumber: "REG003",
  },
  {
    id: 4,
    name: "Bob Williams",
    rollNumber: "004",
    registrationNumber: "REG004",
  },
  {
    id: 5,
    name: "Charlie Brown",
    rollNumber: "005",
    registrationNumber: "REG005",
  },
];

function Attendance() {
  const [students, setStudents] = useState<IStudent[]>([]);

  const handleGetStudents = (filters: IFilters) => {
    // In a real application, this would be an API call
    // For now, we'll simulate it with some dummy data

    setStudents(dummyStudents);
  };
  return (
    <>
      <Container>
        <h1 className="text-2xl font-bold mb-4">Attendance System</h1>
        <AttendanceFilter onGetStudents={handleGetStudents} />
        {students.length > 0 && <AttendanceList students={students} />}
      </Container>
    </>
  );
}

// export
export default Attendance;
