// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDepartments } from "@/features/department/hooks/useDepartments";
import { departmentsAtom } from "@/features/department/recoil/departmentAtom";
import { Input } from "@/components/ui/input";
import { useStudents } from "../../hooks/useStudents";

const Filter = () => {
  const deptInfo = useRecoilValue(departmentsAtom);

  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");

  const [filter, setFilter] = useState({ dept: "", deg: "", year: "" });

  useDepartments("degree");
  useStudents(filter.dept, filter.deg, filter.year);

  const deg = deptInfo.find((item) => item.id === department)?.degrees || [];

  const handleSearch = () => {
    setFilter({ dept: department, deg: degree, year: admissionYear });
  };

  return (
    <div className="flex space-x-4 bg-background text-foreground p-4 rounded-lg">
      <Select onValueChange={setDepartment}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {deptInfo &&
            deptInfo.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select onValueChange={setDegree} disabled={!department}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Degree" />
        </SelectTrigger>
        <SelectContent>
          {deg.length > 0 &&
            deg.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Input
        className="w-[200px]"
        placeholder="admission year"
        value={admissionYear}
        onChange={(e) => setAdmissionYear(e.target.value)}
      />

      <Button className="cursor-pointer" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Filter;
