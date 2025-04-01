// external import
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Department } from "../../pages/Department";

interface DepartmentsProps {
  departments: Department[];
}

const UpdateCourse = ({ departments }: DepartmentsProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [subjects, setSubjects] = useState<{
    [key: number]: { name: string; code: string }[];
  }>({});

  const handleSubjectChange = (
    semester: number,
    index: number,
    field: "name" | "code",
    value: string
  ) => {
    setSubjects((prev) => ({
      ...prev,
      [semester]: prev[semester].map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      ),
    }));
  };

  const handleUpdateCourse = () => {
    // Here you would typically send this data to a backend API
    console.log("Updated subjects:", subjects);
  };
  return (
    <div className="space-y-4">
      <div className="bg-background text-foreground p-4">
        <Label className="text-base" htmlFor="course-select">
          Select Course
        </Label>
        <Select onValueChange={setSelectedCourse}>
          <SelectTrigger id="course-select">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent className="text-[15px]">
            {departments.flatMap((dept) =>
              dept.courses.map((course) => (
                <SelectItem
                  key={`${dept.code}-${course.name}`}
                  value={`${dept.code}-${course.name}`}
                >
                  {course.name} ({dept.code})
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      {selectedCourse && (
        <div className="space-y-4">
          {Array.from({
            length:
              departments
                .find((d) =>
                  d.courses.some(
                    (c) => `${d.code}-${c.name}` === selectedCourse
                  )
                )
                ?.courses.find(
                  (c) =>
                    `${departments.find((d) => d.courses.includes(c))?.code}-${
                      c.name
                    }` === selectedCourse
                )?.semesters || 0,
          }).map((_, semesterIndex) => (
            <div
              key={semesterIndex}
              className="border bg-background text-foreground p-4 rounded space-y-2"
            >
              <h3 className="text-lg font-semibold">
                Semester {semesterIndex + 1}
              </h3>
              {(subjects[semesterIndex + 1] || []).map(
                (subject, subjectIndex) => (
                  <div key={subjectIndex} className="flex space-x-2">
                    <Input
                      placeholder="Subject Name"
                      value={subject.name}
                      onChange={(e) =>
                        handleSubjectChange(
                          semesterIndex + 1,
                          subjectIndex,
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
                          semesterIndex + 1,
                          subjectIndex,
                          "code",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )
              )}
              <Button
                onClick={() =>
                  setSubjects((prev) => ({
                    ...prev,
                    [semesterIndex + 1]: [
                      ...(prev[semesterIndex + 1] || []),
                      { name: "", code: "" },
                    ],
                  }))
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
              </Button>
            </div>
          ))}
          <Button className="w-full" onClick={handleUpdateCourse}>
            Update Course
          </Button>
        </div>
      )}
    </div>
  );
};

// export
export default UpdateCourse;
