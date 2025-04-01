// external import
import { Activity, ListChecks, NotebookPen } from "lucide-react";

// internal import
import SummaryCardItem from "../shared/SummaryCardItem";

// summary card data
const data = [
  {
    id: 1,
    label: "attendence",
    icon: <ListChecks size={20} className="mb-1" />,
    grade: "60%",
  },
  {
    id: 2,
    label: "homework",
    icon: <NotebookPen size={20} className="mb-1" />,
    grade: "40%",
  },
  {
    id: 3,
    label: "activity",
    icon: <Activity size={20} className="mb-1" />,
    grade: "70%",
  },
];

function SummaryCard() {
  return (
    <div className=" w-[370px] mx-auto  flex justify-around gap-1 sm:gap-2 px-1 py-3 bg-background shadow-lg rounded-sm">
      {data.map(({ label, icon, grade, id }) => (
        <SummaryCardItem label={label} icon={icon} grade={grade} key={id} />
      ))}
    </div>
  );
}

// export
export default SummaryCard;
