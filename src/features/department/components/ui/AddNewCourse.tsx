// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

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
import { departmentsAtom } from "../../recoil/departmentAtom";
import { TCourseClient } from "../../types/course";
import { toast } from "sonner";
import { useCreateCourse } from "../../hooks/useCreateCourse";

const initCourse = {
  name: "",
  duration: "",
  semesters: "",
  totalFees: "",
  degree: "",
  departmentType: "",
};

const AddNewCourse = () => {
  const deptInfo = useRecoilValue(departmentsAtom);
  const [course, setCourse] = useState(initCourse);

  const { mutate, isPending } = useCreateCourse();

  const handleCourseChange = (field: string, value: string) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload: TCourseClient = {
      degree: course.degree,
      duration: course.duration,
      name: course.name,
      semesters: course.semesters,
      totalFees: course.totalFees,
    };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "course create successfully");
      },
      onError: (err) => {
        toast.error(err.message || "course not created");
      },
      onSettled: () => {
        setCourse(initCourse);
      },
    });
  };

  const avalableDegrees =
    course.departmentType &&
    deptInfo.find((d) => course.departmentType === d.type)?.degrees;

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
          {deptInfo.map((dept) => (
            <SelectItem key={dept.id} value={dept.type} className="capitalize">
              {dept.type}
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
          {avalableDegrees &&
            avalableDegrees.map((deg) => (
              <SelectItem key={deg.id} value={deg.id}>
                {deg.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
        onClick={handleSubmit}
      >
        {isPending ? "Creating..." : "Create Course"}
      </Button>
    </div>
  );
};

export default AddNewCourse;
