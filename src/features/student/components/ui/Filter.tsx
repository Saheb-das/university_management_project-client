// external import
import { useState } from "react";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSearch: (department: string, degree: string, admissionYear: string) => void;
}

const Filter = ({ onSearch }: SearchFormProps) => {
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");

  const handleSearch = () => {
    onSearch(department, degree, admissionYear);
  };

  return (
    <div className="flex space-x-4 bg-background text-foreground p-4 rounded-lg">
      <Select onValueChange={setDepartment}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cs">Computer Science</SelectItem>
          <SelectItem value="ee">Electrical Engineering</SelectItem>
          <SelectItem value="me">Mechanical Engineering</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setDegree}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Degree" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bs">BS</SelectItem>
          <SelectItem value="ms">MS</SelectItem>
          <SelectItem value="phd">PhD</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setAdmissionYear}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Admission Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2020">2020</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Filter;
