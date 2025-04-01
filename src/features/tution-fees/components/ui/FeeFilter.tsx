// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IFilter {
  department: string;
  course: string;
  semester: string;
}

interface IFeeFilter {
  onFilter: (data: IFilter) => void;
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
];
const courses = ["B.Tech", "M.Tech", "B.E."];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

const initState = {
  department: "",
  course: "",
  semester: "",
};

const FeeFilter = ({ onFilter }: IFeeFilter) => {
  const [filters, setFilters] = useState(initState);

  const handleFilterChange = (filter: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Student Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <Select
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("course", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("semester", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleFilter} className="mt-4">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeeFilter;
