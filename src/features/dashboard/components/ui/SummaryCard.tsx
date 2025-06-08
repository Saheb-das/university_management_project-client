// external import
import { ListChecks } from "lucide-react";

// internal import
import SummaryCardItem from "../shared/SummaryCardItem";
import { useRecoilValue } from "recoil";
import { attendanceCountAtom } from "../../recoil/student/dashboardAtom";
import { calcAttendance } from "@/utils/growthInPercentage";

function SummaryCard() {
  const attendCount = useRecoilValue(attendanceCountAtom);
  if (!attendCount)
    return (
      <p className="text-lg text-gray-700 font-semibold">
        No Data!!&nbsp;&nbsp;&nbsp;Please seed with new one
      </p>
    );

  const percentage = calcAttendance(attendCount);
  return (
    <div className=" w-[370px] mx-auto  flex justify-around gap-1 sm:gap-2 px-1 py-3 bg-background shadow-lg rounded-sm">
      <SummaryCardItem
        label={"attendence"}
        icon={<ListChecks size={20} className="mb-1" />}
        grade={percentage}
      />
    </div>
  );
}

// export
export default SummaryCard;
