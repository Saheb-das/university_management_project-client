// internal import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// types import
import { IStudent, ISubject, TMarks } from "../../pages/Result";

interface IMarksInputProps {
  subject: ISubject;
  student: IStudent;
  marks: TMarks;
  onMarks: (subjectId: number, value: string) => void;
}

const MarksInput = ({ subject, student, marks, onMarks }: IMarksInputProps) => {
  return (
    <div key={subject.id} className="mb-5">
      <Label className="text-base" htmlFor={`subject-${subject.id}`}>
        {subject.name}
      </Label>
      <Input
        id={`subject-${subject.id}`}
        type="number"
        value={marks[student.id]?.[subject.id] || ""}
        onChange={(e) => onMarks(subject.id, e.target.value)}
        placeholder="Enter marks"
      />
    </div>
  );
};

export default MarksInput;
