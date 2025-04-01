// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SubjectCardItem from "../shared/SubjectCardItem";

const todaySubLists = [
  {
    id: 1,
    subject: "artificial inteligence",
    classTime: "12:30",
    classData: "12.04.24",
    classStatus: "completed",
  },
  {
    id: 2,
    subject: "compilier design",
    classTime: "2:30",
    classData: "12.04.24",
    classStatus: "running",
  },
  {
    id: 3,
    subject: "operating system",
    classTime: "3:10",
    classData: "12.04.24",
    classStatus: "pending",
  },
  {
    id: 4,
    subject: "web development",
    classTime: "4:30",
    classData: "12.04.24",
    classStatus: "pending",
  },
  {
    id: 5,
    subject: "cloud computing",
    classTime: "5:30",
    classData: "12.04.24",
    classStatus: "pending",
  },
];

const SubjectsCard = () => {
  return (
    <>
      <ScrollArea className=" ">
        <div className=" flex w-max space-x-4  p-4 ">
          {todaySubLists.map(
            ({ id, subject, classTime, classStatus, classData }) => (
              <SubjectCardItem
                subject={subject}
                classDate={classData}
                classTime={classTime}
                classStatus={classStatus}
                key={id}
              />
            )
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

// export
export default SubjectsCard;
