// external import
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { departmentsAtom } from "../../recoil/departmentAtom";
import { coursesWithSemestersAtom } from "../../recoil/coursesAtom";
import { useCourses } from "../../hooks/useCourses";

type TSem = { id: string; semNo: number };

export interface ICourses {
  id: string;
  name: string;
  numberOfSemeter: number;
  semesters: TSem[];
}

interface Props<T = any> {
  onFilter: (params: T) => void;
  mode: "semesters" | "degreeId" | "courseId";
}

const FilterForCourse = ({ onFilter, mode }: Props) => {
  const deptInfo = useRecoilValue(departmentsAtom);
  const courses = useRecoilValue(coursesWithSemestersAtom);

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  useCourses(selectedDegree, true);

  let degrees = selectedDepartment
    ? deptInfo.find((dept) => dept.id === selectedDepartment)?.degrees || []
    : [];

  const handleDepartment = (deptId: string) => {
    setSelectedDepartment(deptId);
    setSelectedDegree("");
    setSelectedCourse("");
  };

  const handleDegree = (degreeId: string) => {
    setSelectedDegree(degreeId);
  };

  const handleCourse = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  useEffect(() => {
    if (mode === "semesters" && selectedCourse) {
      const semesters =
        courses.find((c) => c.id === selectedCourse)?.semesters || [];
      onFilter(semesters);
    } else if (mode === "degreeId" && selectedDegree) {
      onFilter(selectedDegree);
    } else if (mode === "courseId" && selectedCourse) {
      onFilter(selectedCourse);
    }
  }, [selectedCourse, selectedDegree]);

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      {/* Select Department */}
      <Label className="text-base" htmlFor="department-select">
        Select Department
      </Label>
      <Select onValueChange={handleDepartment}>
        <SelectTrigger id="department-select" className="w-full">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent className="text-[15px]">
          {deptInfo &&
            deptInfo.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Select Degree (depends on selected department) */}
      <Label className="text-base" htmlFor="degree-select">
        Select Degree
      </Label>
      <Select onValueChange={handleDegree} disabled={!selectedDepartment}>
        <SelectTrigger id="degree-select" className="w-full">
          <SelectValue placeholder="Select a degree" />
        </SelectTrigger>
        <SelectContent className="text-[15px]">
          {degrees &&
            degrees.map((degree) => (
              <SelectItem key={degree.id} value={degree.id}>
                {degree.type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Select Course (depends on selected degree) */}
      <Label className="text-base" htmlFor="course-select">
        Select Course
      </Label>
      <Select onValueChange={handleCourse} disabled={!selectedDegree}>
        <SelectTrigger id="course-select" className="w-full">
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent className="text-[15px]">
          {courses &&
            courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterForCourse;
