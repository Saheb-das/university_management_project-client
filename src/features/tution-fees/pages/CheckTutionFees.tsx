// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import FeeFilter, { IFilter } from "../components/ui/FeeFilter";
import FilteredList from "../components/ui/FilteredList";
import VerifyCard from "../components/ui/VerifyCard";
import Container from "@/components/shared/Container";
import { useStudentsByBatchId } from "@/features/result/hooks/useStudentsByBatchId";
import { studentsListByBatchAtom } from "@/features/result/recoil/resultAtom";
import { useFeeTransactionByStudentId } from "../hooks/useFeeTransactionByStudentId";

export interface ITuitionTransaction {
  id: string;
  studentId: string;
  utrNo: string;
  semester: number;
  amount: number;
  date: string;
  status: "verified" | "checking";
}

const initState = {
  department: "",
  degree: "",
  course: "",
  batch: "",
  semester: "",
};

const CheckTutionFees = () => {
  const [filters, setFilters] = useState<IFilter>(initState);
  const [selStudentId, setSelStudentId] = useState("");
  const studentsInfo = useRecoilValue(studentsListByBatchAtom);

  useStudentsByBatchId(filters.batch);
  const { isError, isLoading } = useFeeTransactionByStudentId(
    selStudentId,
    filters.semester,
    filters.batch
  );

  const handleFilter = (data: IFilter) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const handleStudentClick = (studentId: string) => {
    setSelStudentId(studentId);
  };

  const student = studentsInfo.find((item) => item.id === selStudentId);
  const studentName = `${student?.profile?.user?.firstName} ${student?.profile?.user?.lastName}`;
  return (
    <>
      <Container>
        <FeeFilter onFilter={handleFilter} />

        <div className="grid grid-cols-3 gap-8">
          <FilteredList
            onStudentClick={handleStudentClick}
            students={studentsInfo}
          />

          {selStudentId &&
            (isLoading ? (
              <p>Loading... Please wait</p>
            ) : (
              <VerifyCard isError={isError} name={studentName} />
            ))}
        </div>
      </Container>
    </>
  );
};

// export
export default CheckTutionFees;
