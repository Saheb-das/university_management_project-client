// internal import
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  convertRoutine,
  ILecture,
  isBreak,
  isClass,
  isDay,
} from "@/utils/convertRoutine";
import BatchFilter from "../components/ui/BatchFilter";

export type Lecture = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
};

export type DaySchedule = {
  id: string;
  break: string;
  day: string;
  lectures: Lecture[];
};

const RoutineData = [
  {
    id: "cm9fofhjz000tugekefttr8rh",
    break: "12:00 - 12:30",
    day: "monday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.152Z",
    updatedAt: "2025-04-13T13:24:37.152Z",
    lectures: [
      {
        id: "cm9fofhn9000vugekm6ki4voa",
        subject: "Mathematics",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 101",
        scheduleId: "cm9fofhjz000tugekefttr8rh",
        createdAt: "2025-04-13T13:24:37.270Z",
        updatedAt: "2025-04-13T13:24:37.270Z",
      },
      {
        id: "cm9fofhnq000xugeko927hfyg",
        subject: "Physics",
        startTime: "10:05",
        endTime: "11:00",
        room: "Room 102",
        scheduleId: "cm9fofhjz000tugekefttr8rh",
        createdAt: "2025-04-13T13:24:37.286Z",
        updatedAt: "2025-04-13T13:24:37.286Z",
      },
      {
        id: "cm9fofhns000zugekvu92xw4x",
        subject: "Chemistry",
        startTime: "11:00",
        endTime: "12:00",
        room: "Lab 1",
        scheduleId: "cm9fofhjz000tugekefttr8rh",
        createdAt: "2025-04-13T13:24:37.288Z",
        updatedAt: "2025-04-13T13:24:37.288Z",
      },
      {
        id: "cm9fofhnv0011ugekb7zyqtck",
        subject: "Computer Science",
        startTime: "12:30",
        endTime: "13:10",
        room: "Lab 2",
        scheduleId: "cm9fofhjz000tugekefttr8rh",
        createdAt: "2025-04-13T13:24:37.291Z",
        updatedAt: "2025-04-13T13:24:37.291Z",
      },
    ],
  },
  {
    id: "cm9fofhny0013ugek1rb25q2y",
    break: "11:00 - 11:30",
    day: "tuesday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.294Z",
    updatedAt: "2025-04-13T13:24:37.294Z",
    lectures: [
      {
        id: "cm9fofho20015ugekdg8499oe",
        subject: "English",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 103",
        scheduleId: "cm9fofhny0013ugek1rb25q2y",
        createdAt: "2025-04-13T13:24:37.298Z",
        updatedAt: "2025-04-13T13:24:37.298Z",
      },
      {
        id: "cm9fofho40017ugek1ajt7gox",
        subject: "Mathematics",
        startTime: "10:15",
        endTime: "11:00",
        room: "Room 101",
        scheduleId: "cm9fofhny0013ugek1rb25q2y",
        createdAt: "2025-04-13T13:24:37.300Z",
        updatedAt: "2025-04-13T13:24:37.300Z",
      },
      {
        id: "cm9fofho60019ugekkm2x39q2",
        subject: "Physics Lab",
        startTime: "11:30",
        endTime: "13:00",
        room: "Lab 3",
        scheduleId: "cm9fofhny0013ugek1rb25q2y",
        createdAt: "2025-04-13T13:24:37.302Z",
        updatedAt: "2025-04-13T13:24:37.302Z",
      },
    ],
  },
  {
    id: "cm9fofho8001bugekqfqltnph",
    break: "13:00 - 13:30",
    day: "wednesday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.304Z",
    updatedAt: "2025-04-13T13:24:37.304Z",
    lectures: [
      {
        id: "cm9fofhoa001dugek0fvure7e",
        subject: "Chemistry",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 104",
        scheduleId: "cm9fofho8001bugekqfqltnph",
        createdAt: "2025-04-13T13:24:37.306Z",
        updatedAt: "2025-04-13T13:24:37.306Z",
      },
      {
        id: "cm9fofhoc001fugekttfmaxz2",
        subject: "Computer Science",
        startTime: "10:15",
        endTime: "11:15",
        room: "Lab 2",
        scheduleId: "cm9fofho8001bugekqfqltnph",
        createdAt: "2025-04-13T13:24:37.308Z",
        updatedAt: "2025-04-13T13:24:37.308Z",
      },
      {
        id: "cm9fofhoe001hugekmt12enpe",
        subject: "English",
        startTime: "11:30",
        endTime: "12:30",
        room: "Room 103",
        scheduleId: "cm9fofho8001bugekqfqltnph",
        createdAt: "2025-04-13T13:24:37.310Z",
        updatedAt: "2025-04-13T13:24:37.310Z",
      },
      {
        id: "cm9fofhog001jugek5s0funh4",
        subject: "Maths Tutorial",
        startTime: "13:30",
        endTime: "14:30",
        room: "Room 101",
        scheduleId: "cm9fofho8001bugekqfqltnph",
        createdAt: "2025-04-13T13:24:37.312Z",
        updatedAt: "2025-04-13T13:24:37.312Z",
      },
    ],
  },
  {
    id: "cm9fofhoi001lugekis2mikda",
    break: "11:15 - 11:45",
    day: "thursday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.314Z",
    updatedAt: "2025-04-13T13:24:37.314Z",
    lectures: [
      {
        id: "cm9fofhok001nugekz2dkm11o",
        subject: "Mathematics",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 101",
        scheduleId: "cm9fofhoi001lugekis2mikda",
        createdAt: "2025-04-13T13:24:37.316Z",
        updatedAt: "2025-04-13T13:24:37.316Z",
      },
      {
        id: "cm9fofhom001pugekayn3qtu9",
        subject: "Physics",
        startTime: "10:00",
        endTime: "11:15",
        room: "Room 102",
        scheduleId: "cm9fofhoi001lugekis2mikda",
        createdAt: "2025-04-13T13:24:37.318Z",
        updatedAt: "2025-04-13T13:24:37.318Z",
      },
      {
        id: "cm9fofhop001rugekh8ojgz9i",
        subject: "Computer Science Lab",
        startTime: "11:45",
        endTime: "13:15",
        room: "Lab 2",
        scheduleId: "cm9fofhoi001lugekis2mikda",
        createdAt: "2025-04-13T13:24:37.321Z",
        updatedAt: "2025-04-13T13:24:37.321Z",
      },
    ],
  },
  {
    id: "cm9fofhor001tugeklnbo0kro",
    break: "12:30 - 13:00",
    day: "friday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.323Z",
    updatedAt: "2025-04-13T13:24:37.323Z",
    lectures: [
      {
        id: "cm9fofhot001vugekrjwqygvg",
        subject: "Chemistry",
        startTime: "09:00",
        endTime: "10:00",
        room: "Lab 1",
        scheduleId: "cm9fofhor001tugeklnbo0kro",
        createdAt: "2025-04-13T13:24:37.326Z",
        updatedAt: "2025-04-13T13:24:37.326Z",
      },
      {
        id: "cm9fofhow001xugek4xjztu6d",
        subject: "English",
        startTime: "10:15",
        endTime: "11:15",
        room: "Room 103",
        scheduleId: "cm9fofhor001tugeklnbo0kro",
        createdAt: "2025-04-13T13:24:37.328Z",
        updatedAt: "2025-04-13T13:24:37.328Z",
      },
      {
        id: "cm9fofhoz001zugek7829ow5s",
        subject: "Maths Quiz",
        startTime: "11:30",
        endTime: "12:30",
        room: "Room 101",
        scheduleId: "cm9fofhor001tugeklnbo0kro",
        createdAt: "2025-04-13T13:24:37.331Z",
        updatedAt: "2025-04-13T13:24:37.331Z",
      },
      {
        id: "cm9fofhp20021ugekwooj45gj",
        subject: "Seminar",
        startTime: "13:00",
        endTime: "14:00",
        room: "Seminar Hall",
        scheduleId: "cm9fofhor001tugeklnbo0kro",
        createdAt: "2025-04-13T13:24:37.335Z",
        updatedAt: "2025-04-13T13:24:37.335Z",
      },
    ],
  },
  {
    id: "cm9fofhp50023ugekq0ohqnz9",
    break: "10:30 - 11:00",
    day: "saturday",
    routineId: "cm9fofhjv000rugeknhfk8clk",
    createdAt: "2025-04-13T13:24:37.337Z",
    updatedAt: "2025-04-13T13:24:37.337Z",
    lectures: [
      {
        id: "cm9fofhp80025ugekihvexwol",
        subject: "Soft Skills",
        startTime: "09:00",
        endTime: "10:30",
        room: "Room 105",
        scheduleId: "cm9fofhp50023ugekq0ohqnz9",
        createdAt: "2025-04-13T13:24:37.340Z",
        updatedAt: "2025-04-13T13:24:37.340Z",
      },
      {
        id: "cm9fofhpb0027ugektsjr65pr",
        subject: "Workshop",
        startTime: "11:00",
        endTime: "13:00",
        room: "Lab 4",
        scheduleId: "cm9fofhp50023ugekq0ohqnz9",
        createdAt: "2025-04-13T13:24:37.343Z",
        updatedAt: "2025-04-13T13:24:37.343Z",
      },
    ],
  },
];

const RoutineViewer = () => {
  const handleGet = (batchName: string) => {
    console.log(batchName);
  };
  const convertedData = RoutineData.map(convertRoutine);
  return (
    <>
      <BatchFilter onGet={handleGet} />
      <div className="w-full overflow-x-auto rounded-lg border p-4 shadow">
        <Table>
          <TableBody>
            {convertedData.map((schedule, index) => (
              <TableRow key={index}>
                {/* Day Cell */}
                <TableCell className="font-medium capitalize">
                  {schedule.find(isDay)?.today}
                </TableCell>

                {/* Lecture / Break Cells */}
                {schedule
                  .filter((item) => item.type !== "day")
                  .map((item, idx) => {
                    if (isBreak(item)) {
                      return (
                        <TableCell key={`break-${idx}`}>
                          <div className="text-left text-yellow-600 font-semibold">
                            🍔 Break
                          </div>
                        </TableCell>
                      );
                    } else if (isClass(item)) {
                      let lecture: ILecture = item;
                      return (
                        <TableCell key={lecture.id}>
                          <div className="font-semibold">{lecture.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {lecture.startTime} - {lecture.endTime}
                          </div>
                          <div className="text-xs text-gray-500">
                            {lecture.room}
                          </div>
                        </TableCell>
                      );
                    }
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RoutineViewer;
