// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TeacherCardItem from "../shared/TeacherCardItem";
import { useRecoilValue } from "recoil";
import { myTeachersAtom } from "../../recoil/student/dashboardAtom";
import { transformMyTeacherSelector } from "../../recoil/student/dashboardSelector";

const teachersLists = [
  {
    id: 1,
    teacherName: "isabel nelson",
    subject: "java,javascript",
    imgPath: "",
    mailLink: "example@example.com",
  },
  {
    id: 2,
    teacherName: "anton sevchuk",
    subject: "python,c++,c",
    imgPath: "",
    mailLink: "example@example.com",
  },
  {
    id: 3,
    teacherName: "ethen martin",
    subject: "operating system",
    imgPath: "",
    mailLink: "example@example.com",
  },
];

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
