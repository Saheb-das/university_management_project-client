// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilValue } from "recoil";
import { departmentsWithDegreesAtom } from "@/recoil/atoms/filterAtom";
import { useDepartments } from "@/hooks/useDepartment";
import { useCourses } from "@/features/department/hooks/useCourses";
import { coursesWithSemestersAtom } from "@/features/department/recoil/coursesAtom";
import { useBatchesByDeptAndDegIds } from "@/hooks/useBatchesByDeptAndDegIds";

export interface IFilter {
  department: string;
  course: string;
  degree: string;
  batch: string;
  semester: string;
}

const initState = {
  department: "",
  degree: "",
  course: "",
  batch: "",
  semester: "",
};

interface IFeeFilter {
  onFilter: (data: IFilter) => void;
}

const FeeFilter = ({ onFilter }: IFeeFilter) => {
  const [filters, setFilters] = useState(initState);
  const deptWithDegInfo = useRecoilValue(departmentsWithDegreesAtom);
  const coursesWithSemInfo = useRecoilValue(coursesWithSemestersAtom);

  useDepartments("degree");
  useCourses(filters.degree, true);
  const { data: batchData, isSuccess: isBatchSuccess } =
    useBatchesByDeptAndDegIds(filters.department, filters.degree);

  let degsInfo =
    deptWithDegInfo &&
    deptWithDegInfo.length > 0 &&
    deptWithDegInfo.find((item) => item.id === filters.department)?.degrees;

  let semsInfo =
    coursesWithSemInfo &&
    coursesWithSemInfo.length > 0 &&
    coursesWithSemInfo.find((item) => item.id === filters.course)?.semesters;

  const handleFilterChange = (filter: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Student Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {/* department */}
          <Select
            value={filters.department}
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {deptWithDegInfo &&
                deptWithDegInfo.length > 0 &&
                deptWithDegInfo.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={dept.id}
                    className="capitalize"
                  >
                    {dept.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* degree */}
          <Select
            disabled={!filters.department}
            value={filters.degree}
            onValueChange={(value) => handleFilterChange("degree", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              {degsInfo &&
                degsInfo.length > 0 &&
                degsInfo.map((deg) => (
                  <SelectItem
                    key={deg.id}
                    value={deg.id}
                    className="capitalize"
                  >
                    {deg.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* course */}
          <Select
            disabled={!filters.degree}
            value={filters.course}
            onValueChange={(value) => handleFilterChange("course", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {coursesWithSemInfo &&
                coursesWithSemInfo.length > 0 &&
                coursesWithSemInfo.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="capitalize"
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* batch */}
          <Select
            disabled={!filters.course}
            value={filters.batch}
            onValueChange={(value) => handleFilterChange("batch", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {isBatchSuccess &&
                batchData &&
                batchData.batches.length > 0 &&
                batchData.batches.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="capitalize"
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* semester */}
          <Select
            disabled={!filters.course}
            value={filters.semester}
            onValueChange={(value) => handleFilterChange("semester", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {semsInfo &&
                semsInfo.length > 0 &&
                semsInfo.map((item) => (
                  <SelectItem key={item.id} value={item.semNo.toString()}>
                    sem {item.semNo}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleFilter} className="mt-4">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeeFilter;
