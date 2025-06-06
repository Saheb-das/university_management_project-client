// external import
import { useState } from "react";

// internal import
import StudentFilter from "../shared/StudentFilter";
import StudentRollRegTable from "./StudentRollRegTable";

const StudentTableWithFilter = () => {
  const [batchId, setBatchId] = useState("");
  return (
    <>
      <StudentFilter onBatch={setBatchId} />
      <StudentRollRegTable batchId={batchId} />
    </>
  );
};

export default StudentTableWithFilter;
