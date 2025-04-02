// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TCourse = {
  name: string;
  duration: string;
  semesters: number | null;
  totalFees: string;
  degree: string;
};

interface INewDepartment {
  name: string;
  type: string;
  code: string;
  course: TCourse;
}

interface DepartmentsProps {
  setDepartments: React.Dispatch<React.SetStateAction<INewDepartment[]>>;
}

// initial new department data
const initNewDepartment: INewDepartment = {
  name: "",
  type: "",
  code: "",
  course: {
    name: "",
    duration: "",
    semesters: null,
    totalFees: "",
    degree: "",
  },
};

export const degreeOptions = ["Bachelor", "Master", "Ph.D.", "Diploma"];

const NewDepartment = () => {
  const [newDepartment, setNewDepartment] =
    useState<INewDepartment>(initNewDepartment);

  const handleDepartmentChange = (
    field: keyof INewDepartment,
    value: string
  ) => {
    setNewDepartment((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (field: keyof TCourse, value: string) => {
    setNewDepartment((prev) => ({
      ...prev,
      course: { ...prev.course, [field]: value },
    }));

    if (field === "name") {
      const code = value
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      setNewDepartment((prev) => ({ ...prev, code }));
    }
  };

  const handleCreateDepartment = () => {
    setNewDepartment(initNewDepartment);
  };

  return (
    <div className="space-y-4 p-4 bg-background text-foreground">
      <div>
        <Label className="text-base" htmlFor="dept-name">
          Department Name
        </Label>
        <Input
          id="dept-name"
          value={newDepartment.name}
          onChange={(e) => handleDepartmentChange("name", e.target.value)}
        />
      </div>
      <div>
        <Label className="text-base" htmlFor="dept-type">
          Department Type
        </Label>
        <Select
          onValueChange={(value) => handleDepartmentChange("type", value)}
        >
          <SelectTrigger id="dept-type" className="w-full">
            <SelectValue placeholder="Select department type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="law">Law</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-base">Department Code</Label>
        <Input
          placeholder="Department code is generated depending on course name"
          value={newDepartment.code}
          readOnly
        />
      </div>
      <div className="space-y-2 border p-4 rounded">
        <h3 className="text-lg font-semibold">Course</h3>
        <Input
          placeholder="Course Name"
          value={newDepartment.course.name}
          onChange={(e) => handleCourseChange("name", e.target.value)}
        />
        <Input
          placeholder="Duration in Year"
          value={newDepartment.course.duration}
          onChange={(e) => handleCourseChange("duration", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Number of Semesters"
          value={newDepartment.course.semesters?.toString() || ""}
          onChange={(e) => handleCourseChange("semesters", e.target.value)}
        />
        <Input
          placeholder="Total Fees"
          value={newDepartment.course.totalFees}
          onChange={(e) => handleCourseChange("totalFees", e.target.value)}
        />
        <Select onValueChange={(value) => handleCourseChange("degree", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select degree" />
          </SelectTrigger>
          <SelectContent>
            {degreeOptions.map((degree) => (
              <SelectItem key={degree} value={degree}>
                {degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={handleCreateDepartment}>
        Create Department
      </Button>
    </div>
  );
};

// export
export default NewDepartment;
