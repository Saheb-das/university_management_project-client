// external import
import { useEffect, useState } from "react";

// internal import
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ISemester } from "../shared/AddSubjectInCourse";

interface IProps {
  onFilter: (semesters: ISemester[]) => void;
}

interface IDeprt {
  type: string;
  id: string;
  degrees: IDegree[];
}

interface IDegree {
  type: string;
  id: string;
}

export interface ICourses {
  id: string;
  name: string;
  numberOfSemeter: number;
  semesters: { id: string; semNo: number }[];
}

const dummyDepartments: IDeprt[] = [
  {
    type: "Engineering",
    id: "eng-001",
    degrees: [
      { type: "Bachelor", id: "btech-001" },
      { type: "Master", id: "mtech-001" },
      { type: "PhD", id: "phd-eng-001" },
      { type: "Diploma", id: "dip-eng-001" },
    ],
  },
  {
    type: "Medical",
    id: "med-001",
    degrees: [
      { type: "Bachelor", id: "mbbs-001" },
      { type: "Master", id: "md-001" },
      { type: "PhD", id: "phd-med-001" },
      { type: "Diploma", id: "dip-med-001" },
    ],
  },
  {
    type: "Law",
    id: "law-001",
    degrees: [
      { type: "Bachelor", id: "llb-001" },
      { type: "Master", id: "llm-001" },
      { type: "PhD", id: "phd-law-001" },
      { type: "Diploma", id: "dip-law-001" },
    ],
  },
  {
    type: "Business",
    id: "bus-001",
    degrees: [
      { type: "Bachelor", id: "bba-001" },
      { type: "Master", id: "mba-001" },
      { type: "PhD", id: "phd-bus-001" },
      { type: "Diploma", id: "dip-bus-001" },
    ],
  },
];

const courses: ICourses[] = [
  {
    id: "course-001",
    name: "Computer Science",
    numberOfSemeter: 8,
    semesters: [
      { id: "sem-001", semNo: 1 },
      { id: "sem-002", semNo: 2 },
      { id: "sem-003", semNo: 3 },
      { id: "sem-004", semNo: 4 },
      { id: "sem-005", semNo: 5 },
      { id: "sem-006", semNo: 6 },
      { id: "sem-007", semNo: 7 },
      { id: "sem-008", semNo: 8 },
    ],
  },
  {
    id: "course-002",
    name: "Mechanical Engineering",
    numberOfSemeter: 8,
    semesters: [
      { id: "sem-009", semNo: 1 },
      { id: "sem-010", semNo: 2 },
      { id: "sem-011", semNo: 3 },
      { id: "sem-012", semNo: 4 },
      { id: "sem-013", semNo: 5 },
      { id: "sem-014", semNo: 6 },
      { id: "sem-015", semNo: 7 },
      { id: "sem-016", semNo: 8 },
    ],
  },
  {
    id: "course-003",
    name: "Business Administration",
    numberOfSemeter: 6,
    semesters: [
      { id: "sem-017", semNo: 1 },
      { id: "sem-018", semNo: 2 },
      { id: "sem-019", semNo: 3 },
      { id: "sem-020", semNo: 4 },
      { id: "sem-021", semNo: 5 },
      { id: "sem-022", semNo: 6 },
    ],
  },
  {
    id: "course-004",
    name: "Medicine",
    numberOfSemeter: 10,
    semesters: [
      { id: "sem-023", semNo: 1 },
      { id: "sem-024", semNo: 2 },
      { id: "sem-025", semNo: 3 },
      { id: "sem-026", semNo: 4 },
      { id: "sem-027", semNo: 5 },
      { id: "sem-028", semNo: 6 },
      { id: "sem-029", semNo: 7 },
      { id: "sem-030", semNo: 8 },
      { id: "sem-031", semNo: 9 },
      { id: "sem-032", semNo: 10 },
    ],
  },
];

const FilterForCourse = ({ onFilter }: IProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  useEffect(() => {
    // TODO: fetch all departments
  }, []);

  let degrees = selectedDepartment
    ? dummyDepartments.find((dept) => dept.id === selectedDepartment)
        ?.degrees || []
    : [];

  const handleDegree = (degreeId: string) => {
    //  TODO:  fetch courses by degreeId
    setSelectedDegree(degreeId);
  };

  const handleCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    const course = courses.find((course) => course.id === courseId);
    onFilter(course?.semesters || []);
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      {/* Select Department */}
      <Label className="text-base" htmlFor="department-select">
        Select Department
      </Label>
      <Select onValueChange={setSelectedDepartment}>
        <SelectTrigger id="department-select" className="w-full">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent className="text-[15px]">
          {dummyDepartments.map((dept) => (
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
          {degrees.map((degree) => (
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
          {selectedDegree &&
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
