// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LectureCard from "../shared/LectureCard";
import { useTeacherScheduleByDay } from "../../hooks/useTeacherScheduleByDay";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";

const dayArr = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function getStatusFromTime(
  startTime: string,
  endTime: string
): "pending" | "running" | "completed" {
  const now = new Date();

  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const startDate = new Date(now);
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date(now);
  endDate.setHours(endHour, endMin, 0, 0);

  if (now < startDate) return "pending";
  if (now >= startDate && now <= endDate) return "running";
  return "completed";
}

const Lectures = () => {
  const [selectedDay, setSelectedDay] = useState(dayArr[new Date().getDay()]);
  const basicUser = useRecoilValue(userBasicAtom);

  const { data: lecData, isSuccess: isLecSuccess } = useTeacherScheduleByDay(
    basicUser?.id!,
    selectedDay
  );

  return (
    <Card className=" col-span-3">
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle className="text-xl capitalize font-medium">
          today's lectures
        </CardTitle>
        <Select onValueChange={setSelectedDay} defaultValue={selectedDay}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a day" />
          </SelectTrigger>
          <SelectContent>
            {dayArr.map((day) => (
              <SelectItem className="capitalize" key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full bg-secondary whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {isLecSuccess && lecData && lecData.lectures.length > 0 ? (
              lecData.lectures.map((item) => (
                <LectureCard
                  key={item.id}
                  classTitle={item.subject.name}
                  roomNo={item.room}
                  status={getStatusFromTime(item.startTime, item.endTime)}
                  time={`${item.startTime} - ${item.endTime}`}
                />
              ))
            ) : (
              <p className="font-semibold text-lg">Today's schedule off 😎</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// export
export default Lectures;
