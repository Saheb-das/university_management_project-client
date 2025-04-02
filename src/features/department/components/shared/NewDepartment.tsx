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
import { MinusCircle, PlusCircle } from "lucide-react";
import { Department } from "../../pages/Department";

export type Course = {
  name: string;
  duration: string;
  semesters: number;
  totalFees: string;
  degree: string;
};

interface DepartmentsProps {
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

// initial new department data
const initNewDepartment = {
  name: "",
  type: "",
  code: "",
  courses: [
    { name: "", duration: "", semesters: 0, totalFees: "", degree: "" },
  ],
};

const NewDepartment = ({ setDepartments }: DepartmentsProps) => {
  const [newDepartment, setNewDepartment] =
    useState<Department>(initNewDepartment);

  const handleDepartmentChange = (field: keyof Department, value: string) => {
    setNewDepartment((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (
    index: number,
    field: keyof Course,
    value: string
  ) => {
    const updatedCourses = [...newDepartment.courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setNewDepartment((prev) => ({ ...prev, courses: updatedCourses }));

    if (field === "name") {
      const code = value
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      setNewDepartment((prev) => ({ ...prev, code }));
    }
  };

  const addCourse = () => {
    setNewDepartment((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        { name: "", duration: "", semesters: 0, totalFees: "", degree: "" },
      ],
    }));
  };

  const removeCourse = (index: number) => {
    setNewDepartment((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleCreateDepartment = () => {
    setDepartments((prev) => [...prev, newDepartment]);
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
          placeholder="department code is generated depending on course name"
          value={newDepartment.code}
          readOnly
        />
      </div>
      {newDepartment.courses.map((course, index) => (
        <div key={index} className="space-y-2 border p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course {index + 1}</h3>
            {index > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCourse(index)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => handleCourseChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="Duration in Year"
            value={course.duration}
            onChange={(e) =>
              handleCourseChange(index, "duration", e.target.value)
            }
          />
          <Input
            type="number"
            placeholder="Number of Semesters"
            value={course.semesters.toString()}
            onChange={(e) =>
              handleCourseChange(index, "semesters", e.target.value)
            }
          />
          <Input
            placeholder="Total Fees"
            value={course.totalFees}
            onChange={(e) =>
              handleCourseChange(index, "totalFees", e.target.value)
            }
          />
          <Input
            placeholder="Degree"
            value={course.degree}
            onChange={(e) =>
              handleCourseChange(index, "degree", e.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={addCourse}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Course
      </Button>
      <Button className="w-full" onClick={handleCreateDepartment}>
        Create Department
      </Button>
    </div>
  );
};

// export
export default NewDepartment;
