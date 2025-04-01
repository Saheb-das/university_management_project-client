import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export type TFilters = {
  degree: string;
  department: string;
  semester: string;
};

interface IResultFilterProps {
  onStudent: (student: TFilters) => void;
}

export const degrees = ["BSc", "BA", "BEng"];
export const departments = [
  "Computer Science",
  "English",
  "Mechanical",
  "Physics",
  "History",
];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

const ResultFilter = ({ onStudent }: IResultFilterProps) => {
  const [filters, setFilters] = useState<TFilters>({
    degree: "",
    department: "",
    semester: "",
  });

  const handleFilterChange = (filter: keyof TFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleStudent = () => {
    onStudent({ ...filters });
  };
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg px-5 py-3 mb-4">
      <div className=" grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="text-base" htmlFor="degree">
            Degree
          </Label>
          <Select
            onValueChange={(value) => handleFilterChange("degree", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="degree">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              {degrees.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-base" htmlFor="department">
            Department
          </Label>
          <Select
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="department">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-base" htmlFor="semester">
            Semester
          </Label>
          <Select
            onValueChange={(value) => handleFilterChange("semester", value)}
          >
            <SelectTrigger className="mt-2 w-full" id="semester">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester.toString()}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleStudent}>Get Students</Button>
    </div>
  );
};

export default ResultFilter;
