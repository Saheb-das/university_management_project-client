// external import
import { useState } from "react";

// internal import
import AttendanceFilter, { IFilters } from "../components/ui/AttendanceFilter";
import AttendanceList from "../components/ui/AttendanceList";
import Container from "@/components/shared/Container";

function Attendance() {
  const [filter, setFilter] = useState<IFilters>({
    batch: "",
    semester: "",
    subject: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleGetStudents = (filtersData: IFilters) => {
    setFilter((prev) => ({
      ...prev,
      batch: filtersData.batch,
      semester: filtersData.semester,
      subject: filtersData.subject,
    }));
  };
  return (
    <>
      <Container>
        <h1 className="text-2xl font-bold mb-4">Attendance System</h1>
        <AttendanceFilter
          isSubmit={isSubmit}
          onGetStudents={handleGetStudents}
        />
        {Object.values(filter).every((item) => item !== "") && (
          <AttendanceList onSubmit={setIsSubmit} filter={filter} />
        )}
      </Container>
    </>
  );
}

// export
export default Attendance;
