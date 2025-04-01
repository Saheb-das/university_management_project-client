// internal import
import CurrPayStatus from "../components/ui/CurrPayStatus";
import BasicCourseInfo from "../components/ui/BasicCourseInfo";
import SemesterPaymentHistory from "../components/ui/SemesterPaymentHistory";

const MakeTutionFees = () => {
  return (
    <div className=" mt-5 w-[96%] lg:w-[84%] py-3 mx-auto">
      {/* course details */}
      <BasicCourseInfo />

      {/* current payment status */}
      <CurrPayStatus />

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
