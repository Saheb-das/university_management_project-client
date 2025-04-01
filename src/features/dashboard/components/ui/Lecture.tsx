import { useState } from "react";
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
import { ILecture } from "../../pages/TeacherDashboard";

const Lectures = ({ schedules }: { schedules: Record<string, ILecture[]> }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");

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
            {Object.keys(schedules).map((day) => (
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
            {schedules[selectedDay as keyof typeof schedules].map(
              (item, index) => (
                <LectureCard
                  key={index}
                  classTitle={item.class}
                  roomNo={item.room}
                  status={item.status}
                  time={item.time}
                />
              )
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
