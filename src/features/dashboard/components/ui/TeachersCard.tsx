// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TeacherCardItem from "../shared/TeacherCardItem";
import { useRecoilValue } from "recoil";
import { transformMyTeacherSelector } from "../../recoil/student/dashboardSelector";

function TeachersCard() {
  const teachersInfo = useRecoilValue(transformMyTeacherSelector);
  if (!teachersInfo)
    return (
      <p className="text-lg text-gray-800 font-semibold">
        No Data!!&nbsp;&nbsp;&nbsp;Please seed with new one
      </p>
    );

  return (
    <ScrollArea className="">
      <div className=" flex w-max space-x-4  p-4">
        {teachersInfo && teachersInfo.length > 0 ? (
          teachersInfo.map(
            ({ id, teacherName, subject, imgPath, mailLink }) => (
              <TeacherCardItem
                key={id}
                teacherName={teacherName}
                subject={subject}
                imgPath={imgPath}
                mailLink={mailLink}
              />
            )
          )
        ) : (
          <p className="text-lg text-gray-800 font-semibold">
            There are no teachers yet!!
          </p>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default TeachersCard;
