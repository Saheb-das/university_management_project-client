// external import
import { useState } from "react";

// internal import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { degreeOptions } from "../shared/NewDepartment";

const departmentTypes = [
  "science",
  "arts",
  "commerce",
  "engineering",
  "medical",
];

const AddNewCourse = () => {
  const [course, setCourse] = useState({
    name: "",
    duration: "",
    semesters: "",
    totalFees: "",
    degree: "",
    departmentType: "",
  });

  const handleCourseChange = (field: string, value: string) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 p-4 bg-background text-foreground">
      <Label>Course Name</Label>
      <Input
        value={course.name}
        onChange={(e) => handleCourseChange("name", e.target.value)}
      />

      <Label>Department Type</Label>
      <Select
        onValueChange={(value) => handleCourseChange("departmentType", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select department type" />
        </SelectTrigger>
        <SelectContent>
          {departmentTypes.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Duration (Years)</Label>
      <Input
        value={course.duration}
        onChange={(e) => handleCourseChange("duration", e.target.value)}
      />

      <Label>Number of Semesters</Label>
      <Input
        type="number"
        value={course.semesters}
        onChange={(e) => handleCourseChange("semesters", e.target.value)}
      />

      <Label>Total Fees</Label>
      <Input
        value={course.totalFees}
        onChange={(e) => handleCourseChange("totalFees", e.target.value)}
      />

      <Label>Degree</Label>
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

      <Button className="w-full">Create Course</Button>
    </div>
  );
};

export default AddNewCourse;
