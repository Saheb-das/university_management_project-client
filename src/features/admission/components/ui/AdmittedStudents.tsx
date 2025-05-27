// external import
import { useState } from "react";
import { useParams } from "react-router";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAdmittedStudent } from "../../hooks/useAdmittedStudent";
import { admissionListAtom } from "../../recoil/admissionAtom";

const AdmittedStudents = () => {
  const { userId } = useParams();
  const admissionsListInfo = useRecoilValue(admissionListAtom);

  const [filteredStudents, setFilteredStudents] = useState(admissionsListInfo);
  const [filters, setFilters] = useState({
    department: "all",
    degree: "all",
    year: "all",
  });

  if (!userId) return;

  useAdmittedStudent(userId);

  const uniqueDepartments = [
    ...new Set(admissionsListInfo.map((student) => student.department.type)),
  ];
  const uniqueDegrees = [
    ...new Set(admissionsListInfo.map((student) => student.degree.type)),
  ];
  const uniqueYears = [
    ...new Set(admissionsListInfo.map((student) => student.inYear.toString())),
  ];

  const handleFilterChange = (
    filterType: "department" | "degree" | "year",
    value: string
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    const newFilteredStudents = admissionsListInfo.filter(
      (student) =>
        (newFilters.department === "all" ||
          student.department.type === newFilters.department) &&
        (newFilters.degree === "all" ||
          student.degree.type === newFilters.degree) &&
        (newFilters.year === "all" ||
          student.inYear.toString() === newFilters.year)
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((item) => (
                <TableRow className="capitalize" key={item.id}>
                  <TableCell>
                    {item.student.profile.user.firstName}{" "}
                    {item.student.profile.user.lastName}
                  </TableCell>
                  <TableCell>{item.department.type}</TableCell>
                  <TableCell>{item.course.name}</TableCell>
                  <TableCell>{item.degree.type}</TableCell>
                  <TableCell>{item.inYear.toString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// export
export default AdmittedStudents;
