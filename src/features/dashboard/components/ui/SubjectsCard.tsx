// external import
import { useRecoilValue } from "recoil";

// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SubjectCardItem from "../shared/SubjectCardItem";
import { todayClassScheduleAtom } from "../../recoil/student/dashboardAtom";

const SubjectsCard = () => {
  const scheduleInfo = useRecoilValue(todayClassScheduleAtom);
  if (!scheduleInfo)
    return (
      <p className="text-lg text-blue-800 font-semibold">
        No Data!!&nbsp;&nbsp;&nbsp;Please seed with new one
      </p>
    );

  return (
    <>
      <ScrollArea className=" ">
        <div className=" flex w-max space-x-4  p-4 ">
          {scheduleInfo &&
            scheduleInfo.lectures.length > 0 &&
            [...scheduleInfo.lectures]
              .sort((a, b) => {
                const [aHour, aMin] = a.startTime.split(":").map(Number);
                const [bHour, bMin] = b.startTime.split(":").map(Number);

                return aHour !== bHour ? aHour - bHour : aMin - bMin;
              })
              .map((item) => (
                <SubjectCardItem
                  subject={item.subject.name}
                  classDate={new Date().toLocaleDateString()}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  key={item.id}
                />
              ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

// export
export default SubjectsCard;
