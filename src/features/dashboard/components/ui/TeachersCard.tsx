// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TeacherCardItem from "../shared/TeacherCardItem";

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
  return (
    <ScrollArea className="">
      <div className=" flex w-max space-x-4  p-4">
        {teachersLists.map(
          ({ id, teacherName, subject, imgPath, mailLink }) => (
            <TeacherCardItem
              key={id}
              teacherName={teacherName}
              subject={subject}
              imgPath={imgPath}
              mailLink={mailLink}
            />
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default TeachersCard;
