import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { ISemester } from "../shared/AddSubjectInCourse";

interface Subject {
  name: string;
  code: string;
  credit: number;
}

const AddSubjects = ({ semesters }: { semesters: ISemester[] }) => {
  const [subjects, setSubjects] = useState<{ [key: string]: Subject[] }>({});

  const handleSubjectChange = (
    semesterId: string,
    index: number,
    field: keyof Subject,
    value: string | number
  ) => {
    setSubjects((prev) => ({
      ...prev,
      [semesterId]: (prev[semesterId] || []).map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      ),
    }));
  };

  const addSubject = (semesterId: string) => {
    setSubjects((prev) => ({
      ...prev,
      [semesterId]: [
        ...(prev[semesterId] || []),
        { name: "", code: "", credit: 0 },
      ],
    }));
  };

  const removeSubject = (semesterId: string, index: number) => {
    setSubjects((prev) => ({
      ...prev,
      [semesterId]: (prev[semesterId] || []).filter((_, i) => i !== index),
    }));
  };

  const handleClick = () => {
    // TODO: here api call to create subject for each semester
    console.log("subjects", subjects);
  };
  return (
    <div className="space-y-4 p-6 bg-card rounded-lg shadow-2xl">
      {semesters?.length > 0 ? (
        semesters.map((semester) => (
          <div
            key={semester.id}
            className="border bg-background text-foreground p-4 rounded space-y-2"
          >
            <h3 className="text-lg font-semibold">Semester {semester.semNo}</h3>

            {(subjects[semester.id] || []).map((subject, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <Input
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) =>
                    handleSubjectChange(
                      semester.id,
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
                <Input
                  placeholder="Subject Code"
                  value={subject.code}
                  onChange={(e) =>
                    handleSubjectChange(
                      semester.id,
                      index,
                      "code",
                      e.target.value
                    )
                  }
                />
                <Input
                  type="number"
                  placeholder="Credit"
                  value={subject.credit}
                  onChange={(e) =>
                    handleSubjectChange(
                      semester.id,
                      index,
                      "credit",
                      Number(e.target.value)
                    )
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeSubject(semester.id, index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button onClick={() => addSubject(semester.id)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </div>
        ))
      ) : (
        <p>No semesters available.</p>
      )}

      <Button
        onClick={handleClick}
        disabled={semesters.length === 0}
        className="capitalize ml-auto mt-5 cursor-pointer"
      >
        submit
      </Button>
    </div>
  );
};

export default AddSubjects;
