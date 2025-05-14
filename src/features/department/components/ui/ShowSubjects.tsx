// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import CourseSubjectsCard from "../shared/CourseSubjectsCard";
import FilterForCourse from "./FilterForCourse";
import { useSubjects } from "../../hooks/useSubjects";
import { courseSubjectsAtom } from "../../recoil/coursesAtom";

const ShowSubjects = () => {
  const [courseId, setCourseId] = useState("");
  const courseSubjectsInfo = useRecoilValue(courseSubjectsAtom);

  const { isError, isLoading } = useSubjects(courseId);
  return (
    <div>
      <FilterForCourse onFilter={setCourseId} mode={"courseId"} />

      {courseId && (
        <>
          {isLoading && <p>subjects loading...</p>}
          {isError && <p>fetching subjects error...</p>}

          {courseSubjectsInfo && (
            <CourseSubjectsCard courseSubjects={courseSubjectsInfo} />
          )}
        </>
      )}
    </div>
  );
};

export default ShowSubjects;
