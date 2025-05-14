// external import
import { useState } from "react";

// internal import
import FilterForCourse from "../ui/FilterForCourse";
import AddSubjects from "../ui/AddSubjects";

export interface ISemester {
  id: string;
  semNo: number;
}

const AddSubjectInCourse = () => {
  const [semesters, setSemesters] = useState<ISemester[] | []>([]);

  const handleFilter = (semestersInfo: ISemester[]) => {
    setSemesters(semestersInfo);
  };

  return (
    <div className="space-y-4">
      <div className="bg-background text-foreground p-4">
        <FilterForCourse onFilter={handleFilter} mode={"semesters"} />
      </div>
      <AddSubjects semesters={semesters} />
    </div>
  );
};

// export
export default AddSubjectInCourse;
