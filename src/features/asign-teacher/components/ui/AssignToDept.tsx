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

const batchList = [
  { id: "1", batchName: "bachelor-CSE-2020" },
  { id: "2", batchName: "bachelor-CSE-2021" },
  { id: "3", batchName: "bachelor-ECE-2020" },
  { id: "4", batchName: "bachelor-EEE-2019" },
  { id: "5", batchName: "bachelor-MECH-2022" },
  { id: "6", batchName: "bachelor-CIVIL-2023" },
  { id: "7", batchName: "master-CSE-2022" },
  { id: "8", batchName: "master-ECE-2021" },
  { id: "9", batchName: "master-MATH-2020" },
  { id: "10", batchName: "diploma-IT-2021" },
];

const semesterList = [
  { id: "sem-1", semNo: 1 },
  { id: "sem-2", semNo: 2 },
  { id: "sem-3", semNo: 3 },
  { id: "sem-4", semNo: 4 },
  { id: "sem-5", semNo: 5 },
  { id: "sem-6", semNo: 6 },
  { id: "sem-7", semNo: 7 },
  { id: "sem-8", semNo: 8 },
];

const subjectList = [
  { id: "sub-1", subjectName: "Mathematics I" },
  { id: "sub-2", subjectName: "Physics I" },
  { id: "sub-3", subjectName: "Computer Fundamentals" },
  { id: "sub-4", subjectName: "Programming in C" },
  { id: "sub-5", subjectName: "English Communication" },
  { id: "sub-6", subjectName: "Data Structures" },
  { id: "sub-7", subjectName: "Digital Logic Design" },
  { id: "sub-8", subjectName: "Discrete Mathematics" },
  { id: "sub-9", subjectName: "Object-Oriented Programming" },
  { id: "sub-10", subjectName: "Database Management Systems" },
];

export interface IAssignTeacher {
  batch: string;
  semester: string;
  subject: string;
}

interface AssignTeacherProps {
  onAssignTeacher: ({ batch, semester, subject }: IAssignTeacher) => void;
}

function AssignToDept({ onAssignTeacher }: AssignTeacherProps) {
  const [batch, setBatch] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [subject, setSubject] = useState("");

  const handleAssign = () => {
    if (!batch || !subject || !semester) return;

    onAssignTeacher({ batch, subject, semester });
  };

  return (
    <div className="bg-background text-foreground shadow-lg rounded-xl p-6 space-y-5 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center ">
        Assign Teacher to Department
      </h2>

      {/* Select Batch */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          Batch Name
        </Label>
        <Select value={batch} onValueChange={setBatch}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            {batchList.map((batch) => (
              <SelectItem key={batch.id} value={batch.batchName}>
                {batch.batchName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Semester */}
      <div>
        <Label className="text-sm font-medium text-foreground">Semester</Label>
        <Select value={semester} onValueChange={setSemester} disabled={!batch}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {batch &&
              semesterList?.map((sem) => (
                <SelectItem key={sem.id} value={sem.semNo.toString()}>
                  Semester {sem.semNo}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Subject */}
      <div>
        <Label className="text-sm font-medium text-foreground">Subject</Label>
        <Select
          value={subject}
          onValueChange={setSubject}
          disabled={!batch || !semester}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {batch &&
              semester &&
              subjectList?.map((sub) => (
                <SelectItem key={sub.id} value={sub.subjectName}>
                  {sub.subjectName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Assign Button */}
      <Button
        onClick={handleAssign}
        disabled={!batch || !subject || !semester}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
      >
        Assign Teacher
      </Button>
    </div>
  );
}

export default AssignToDept;
