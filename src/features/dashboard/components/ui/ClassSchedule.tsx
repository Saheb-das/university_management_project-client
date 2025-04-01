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
import ClassScheduleItem from "../shared/ClassScheduleItem";

const schedules = {
  Monday: [
    {
      time: "09:00 AM - 10:30 AM",
      class: "Mathematics 101",
      room: "Room 201",
      status: "finished",
    },
    {
      time: "11:00 AM - 12:30 PM",
      class: "History 202",
      room: "Room 105",
      status: "running",
    },
    {
      time: "02:00 PM - 03:30 PM",
      class: "Physics 301",
      room: "Lab 3",
      status: "pending",
    },
    {
      time: "04:00 PM - 05:30 PM",
      class: "Computer Science 401",
      room: "Lab 1",
      status: "pending",
    },
  ],
  Tuesday: [
    {
      time: "10:00 AM - 11:30 AM",
      class: "Literature 201",
      room: "Room 302",
      status: "pending",
    },
    {
      time: "01:00 PM - 02:30 PM",
      class: "Chemistry 102",
      room: "Lab 2",
      status: "pending",
    },
    {
      time: "03:00 PM - 04:30 PM",
      class: "Art History 301",
      room: "Room 401",
      status: "pending",
    },
  ],
  // Add more days as needed
};

const ClassSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <Card className=" col-span-3">
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle className="text-xl capitalize font-medium">
          Class Schedule
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
                <ClassScheduleItem
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
export default ClassSchedule;
