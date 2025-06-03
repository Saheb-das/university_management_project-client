// external import
import { SetStateAction } from "react";

// internal import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// types import
import { ISubject } from "../../types/result";

interface Props {
  subjects: ISubject[];
  marks: Record<string, number>;
  onMarks: React.Dispatch<SetStateAction<Record<string, number>>>;
}

const MarksInput = ({ subjects, marks, onMarks }: Props) => {
  const handleChange = (subjectId: string, value: number) => {
    onMarks((prev) => ({ ...prev, [subjectId]: value }));
  };

  return (
    <>
      {subjects.map((subject) => (
        <div key={subject.id} className="mb-5">
          <Label className="text-base" htmlFor={`subject-${subject.id}`}>
            {subject.name}
          </Label>
          <Input
            id={`subject-${subject.id}`}
            type="number"
            value={marks[subject.id] || ""}
            onChange={(e) => handleChange(subject.id, Number(e.target.value))}
            placeholder="Enter marks"
          />
        </div>
      ))}
    </>
  );
};

export default MarksInput;
