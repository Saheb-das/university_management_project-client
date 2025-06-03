import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useRecoilValue } from "recoil";
import { departmentsAtom } from "../../recoil/departmentAtom";
import { useCourses } from "../../hooks/useCourses";
import { coursesWithSemestersAtom } from "../../recoil/coursesAtom";
import { IExam, IExamBody } from "../../types/course";
import { useCreateExam } from "../../hooks/useCreateExam";
import { toast } from "sonner";

export default function Component() {
  const deptsInfo = useRecoilValue(departmentsAtom);
  const coursesInfo = useRecoilValue(coursesWithSemestersAtom);
  const { mutate, isPending } = useCreateExam();

  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [exams, setExams] = useState<IExam[]>([]);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);

  let degsInfo =
    deptsInfo && deptsInfo.find((item) => item.id === department)?.degrees;

  useCourses(degree);

  const addInputField = () => {
    const newId = Math.max(...inputFields.map((field) => field.id)) + 1;
    setInputFields([...inputFields, { id: newId, value: "" }]);
  };

  const removeInputField = (id: number) => {
    if (inputFields.length > 1) {
      setInputFields(inputFields.filter((field) => field.id !== id));
    }
  };

  const updateInputField = (id: number, value: string) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const examTypes = inputFields.map((item) => item.value.trim());
    const examPayload: IExamBody = {
      course: course,
      examTypes: examTypes,
    };
    mutate(examPayload, {
      onSuccess: (res) => {
        if (!res) return res;

        res.success && toast.success(res.message || "exams created");
        setExams(res.exams);
      },
      onError: (err) => {
        toast.error(err.message || "failed to create exams");
      },
      onSettled: () => {
        setDepartment("");
        setDegree("");
        setCourse("");
      },
    });
  };

  const allSelectionsComplete = department && degree && course;

  return (
    <div className="w-full grid grid-cols-12 gap-3">
      <Card className=" col-span-9">
        <CardHeader>
          <CardTitle>Exam Type Creation Form</CardTitle>
          <CardDescription>
            Select your department, degree, and course, then add type of exam (
            1st-internal ) information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Selection */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {deptsInfo &&
                    deptsInfo.map((dept) => (
                      <SelectItem
                        className="capitalize"
                        key={dept.id}
                        value={dept.id}
                      >
                        {dept.type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Degree Selection */}
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Select
                disabled={!department}
                value={degree}
                onValueChange={setDegree}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a degree" />
                </SelectTrigger>
                <SelectContent>
                  {degsInfo &&
                    degsInfo.map((deg) => (
                      <SelectItem
                        className="capitalize"
                        key={deg.id}
                        value={deg.id}
                      >
                        {deg.type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Course Selection */}
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select
                disabled={!degree}
                value={course}
                onValueChange={setCourse}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {coursesInfo &&
                    coursesInfo.map((crs) => (
                      <SelectItem
                        className="capitalize"
                        key={crs.id}
                        value={crs.id}
                      >
                        {crs.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Input Fields - Only show when all selections are complete */}
            {allSelectionsComplete && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Additional Information</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInputField}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Field
                  </Button>
                </div>

                <div className="space-y-3">
                  {inputFields.map((field) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Input
                        placeholder={`Additional info ${field.id}`}
                        value={field.value}
                        onChange={(e) =>
                          updateInputField(field.id, e.target.value)
                        }
                        className="flex-1"
                      />
                      {inputFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeInputField(field.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!allSelectionsComplete}
            >
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>
      {exams.length > 0 && (
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Exam Type </CardTitle>
            <CardDescription>list of created exams</CardDescription>
            <CardContent>
              <ul>
                {exams.map((item) => (
                  <li className="capitalize" key={item.id}>
                    {item.type}
                  </li>
                ))}
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
