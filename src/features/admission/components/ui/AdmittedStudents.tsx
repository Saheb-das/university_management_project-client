import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Mock data for admitted students
const admittedStudentsList = [
  {
    id: 1,
    name: "John Doe",
    department: "Computer Science",
    course: "Software Engineering",
    degree: "Bachelor",
    admissionYear: 2023,
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Business",
    course: "Marketing",
    degree: "Master",
    admissionYear: 2023,
  },
  {
    id: 3,
    name: "Alice Johnson",
    department: "Engineering",
    course: "Mechanical Engineering",
    degree: "Bachelor",
    admissionYear: 2022,
  },
  {
    id: 4,
    name: "Bob Brown",
    department: "Arts",
    course: "Fine Arts",
    degree: "Bachelor",
    admissionYear: 2022,
  },
  {
    id: 5,
    name: "Charlie Davis",
    department: "Science",
    course: "Physics",
    degree: "PhD",
    admissionYear: 2023,
  },
];

const AdmittedStudents = () => {
  const [filteredStudents, setFilteredStudents] =
    useState(admittedStudentsList);
  const [filters, setFilters] = useState({
    department: "",
    degree: "",
    year: "",
  });

  const uniqueDepartments = [
    ...new Set(admittedStudentsList.map((student) => student.department)),
  ];
  const uniqueDegrees = [
    ...new Set(admittedStudentsList.map((student) => student.degree)),
  ];
  const uniqueYears = [
    ...new Set(admittedStudentsList.map((student) => student.admissionYear)),
  ];

  const handleFilterChange = (
    filterType: "department" | "degree" | "year",
    value: string
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    const newFilteredStudents = admittedStudentsList.filter(
      (student) =>
        (newFilters.department === "all" ||
          student.department === newFilters.department) &&
        (newFilters.degree === "all" || student.degree === newFilters.degree) &&
        (newFilters.year === "all" ||
          student.admissionYear.toString() === newFilters.year)
    );

    setFilteredStudents(newFilteredStudents);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admitted Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Select
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {uniqueDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleFilterChange("degree", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Degrees</SelectItem>
              {uniqueDegrees.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("year", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Admission Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.degree}</TableCell>
                <TableCell>{student.admissionYear}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// export
export default AdmittedStudents;
