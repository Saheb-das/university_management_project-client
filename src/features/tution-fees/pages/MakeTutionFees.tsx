// external import
import { useRecoilValue } from "recoil";

// internal import
import CurrPayStatus from "../components/ui/CurrPayStatus";
import BasicCourseInfo from "../components/ui/BasicCourseInfo";
import SemesterPaymentHistory from "../components/ui/SemesterPaymentHistory";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";
import { useMyAllTransactions } from "@/hooks/useMyAllTransactions";

const MakeTutionFees = () => {
  const studentInfo = useRecoilValue(studentUserAtom);
  useMyAllTransactions();

  const basicCourse = {
    deg: studentInfo?.course?.degree?.type,
    course: studentInfo?.course?.name,
    curSem: studentInfo?.currentSemester[0]?.semester?.semNo,
    batch: studentInfo?.batch?.name,
  };

  return (
    <div className=" mt-5 w-[96%] lg:w-[84%] py-3 mx-auto">
      {/* course details */}
      <BasicCourseInfo basicCourse={basicCourse} />

      {/* current payment status */}
      <CurrPayStatus courseId={studentInfo?.courseId} />

      {/* payment history */}
      <div className="mt-8">
        <h2 className="text-primary underline underline-offset-4 font-semibold text-lg sm:text-xl md:text-[22px] md:font-medium capitalize mb-3">
          payment history
        </h2>
        <div>
          {/* payment history table */}
          <SemesterPaymentHistory />
        </div>
      </div>

      {/*receipt  */}
    </div>
  );
};

// export
export default MakeTutionFees;
