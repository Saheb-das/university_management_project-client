// external import
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export type TDegreeData = {
  bachelor: { department: string; semester: number }[];
  master: { department: string; semester: number }[];
  phd: { department: string; semester: number | string }[];
  diploma: { department: string; semester: number }[];
};

// dummy data
const data: TDegreeData = {
  bachelor: [
    { department: "Computer Science", semester: 8 },
    { department: "Electrical Engineering", semester: 8 },
    { department: "Mechanical Engineering", semester: 8 },
    { department: "Civil Engineering", semester: 8 },
    { department: "Business Administration", semester: 6 },
  ],
  master: [
    { department: "Computer Science", semester: 4 },
    { department: "Electrical Engineering", semester: 4 },
    { department: "Data Science", semester: 4 },
    { department: "Civil Engineering", semester: 4 },
    { department: "MBA (Business Administration)", semester: 4 },
  ],
  phd: [
    { department: "Computer Science", semester: "Depends on Research" },
    { department: "Physics", semester: "Depends on Research" },
    { department: "Electrical Engineering", semester: "Depends on Research" },
    { department: "Economics", semester: "Depends on Research" },
    { department: "Mechanical Engineering", semester: "Depends on Research" },
  ],
  diploma: [
    { department: "Computer Science", semester: 6 },
    { department: "Electrical Engineering", semester: 6 },
    { department: "Mechanical Engineering", semester: 6 },
    { department: "Civil Engineering", semester: 6 },
    { department: "Graphic Design", semester: 4 },
  ],
};

export interface IAssignTeacher {
  degree: keyof TDegreeData | string;
  department: string;
  semester: string;
}

interface AssignTeacherProps {
  onAssignTeacher: ({ degree, department, semester }: IAssignTeacher) => void;
}

function AssignToDept({ onAssignTeacher }: AssignTeacherProps) {
  const [degree, setDegree] = useState<keyof TDegreeData | string>("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState<string>("");

  const handleAssign = () => {
    if (!degree || !department || !semester) return;

    onAssignTeacher({ degree, department, semester });
  };

  return (
    <div className="bg-background text-foreground shadow-lg rounded-xl p-6 space-y-5 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center ">
        Assign Teacher to Department
      </h2>

      {/* Select Degree */}
      <div>
        <Label className="text-sm font-medium text-foreground">Degree</Label>
        <Select value={degree} onValueChange={setDegree}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bachelor">Bachelor</SelectItem>
            <SelectItem value="master">Master</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select Department */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          Department
        </Label>
        <Select
          value={department}
          onValueChange={setDepartment}
          disabled={!degree}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {degree &&
              data[degree as keyof TDegreeData]?.map((item) => (
                <SelectItem key={item.department} value={item.department}>
                  {item.department}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Semester */}
      <div>
        <Label className="text-sm font-medium text-foreground">Semester</Label>
        <Select
          value={semester}
          onValueChange={setSemester}
          disabled={!degree || !department}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {degree &&
              department &&
              (() => {
                const semesterCount = data[degree as keyof TDegreeData].find(
                  (item) => item.department === department
                )?.semester;

                if (typeof semesterCount === "number") {
                  return Array.from({ length: semesterCount }, (_, index) => (
                    <SelectItem key={index} value={`${index + 1}`}>
                      Semester {index + 1}
                    </SelectItem>
                  ));
                }
                return (
                  <SelectItem value="Depends on Research">
                    Depends on Research
                  </SelectItem>
                );
              })()}
          </SelectContent>
        </Select>
      </div>

      {/* Assign Button */}
      <Button
        onClick={handleAssign}
        disabled={!degree || !department || !semester}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
      >
        Assign Teacher
      </Button>
    </div>
  );
}

export default AssignToDept;
