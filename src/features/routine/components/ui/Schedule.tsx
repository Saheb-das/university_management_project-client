// external import
import { Calendar, Clock, Trash2 } from "lucide-react";

// internal import
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LecturesList from "./LecturesList";
import { days } from "../../pages/RoutineCreator";

// types import
import { ILecture, ISchedule, TDay } from "../../types/routine";

interface ScheduleProps {
  schedule: ISchedule;
  scheduleIndex: number;
  selectedDays: TDay[];
  removeSchedule: (index: number) => void;
  updateSchedule: (index: number, field: keyof ISchedule, value: any) => void;
  addLecture: (scheduleIndex: number) => void;
  removeLecture: (scheduleIndex: number, lectureIndex: number) => void;
  updateLecture: (
    scheduleIndex: number,
    lectureIndex: number,
    field: keyof ILecture,
    value: string
  ) => void;
  errors: Record<string, string>;
}

const Schedule = ({
  schedule,
  scheduleIndex,
  selectedDays,
  removeSchedule,
  updateSchedule,
  addLecture,
  removeLecture,
  updateLecture,
  errors,
}: ScheduleProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <Select
              onValueChange={(value) =>
                updateSchedule(scheduleIndex, "day", value as string)
              }
              value={schedule.day}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem
                    key={d}
                    value={d}
                    disabled={selectedDays.includes(d) && d !== schedule.day}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => removeSchedule(scheduleIndex)}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock size={16} /> Break Time
          </Label>
          <Input
            value={schedule.break}
            onChange={(e) =>
              updateSchedule(scheduleIndex, "break", e.target.value)
            }
            placeholder="e.g., 1:00 PM - 2:00 PM"
          />
        </div>

        <Separator />

        <LecturesList
          scheduleIndex={scheduleIndex}
          lectures={schedule.lectures}
          addLecture={addLecture}
          removeLecture={removeLecture}
          updateLecture={updateLecture}
          errors={errors}
        />
      </CardContent>
    </Card>
  );
};

export default Schedule;
