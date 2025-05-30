// external import
import { useRecoilValue } from "recoil";

// internal import
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  convertRoutine,
  isBreak,
  isClass,
  isDay,
} from "@/utils/convertRoutine";
import BatchFilter from "../components/ui/BatchFilter";
import { routineScheduleAtom } from "../recoil/routineAtom";
import { IGetLecture } from "../types/routine";

const RoutineViewer = () => {
  const routneScheduleInfo = useRecoilValue(routineScheduleAtom);

  const convertedData =
    routneScheduleInfo && routneScheduleInfo.map(convertRoutine);

  return (
    <>
      <BatchFilter />

      <div className="w-full overflow-x-auto rounded-lg border p-4 shadow">
        {convertedData && convertedData.length === 0 ? (
          <p className="capitalize text-2xl">there is no routine</p>
        ) : (
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
                        let lecture: IGetLecture = item;
                        return (
                          <TableCell key={lecture.id}>
                            <div className="font-semibold">
                              {lecture.subject.name}
                            </div>
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
        )}
      </div>
    </>
  );
};

export default RoutineViewer;
