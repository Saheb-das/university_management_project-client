// external import
import { ReactNode } from "react";

type SumCardOptType = {
  label: string;
  icon: ReactNode;
  grade: string;
};

function SummaryCardItem({ label, icon, grade }: SumCardOptType) {
  return (
    <div className="flex flex-col items-center ">
      <h2 className="capitalize font-medium mb-2 ">{label}</h2>
      {icon}
      <p className="text-foreground font-bold text-[20px] md:text-[22px]">
        {grade}
      </p>
    </div>
  );
}

// export
export default SummaryCardItem;
