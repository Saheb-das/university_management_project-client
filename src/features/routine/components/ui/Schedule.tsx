import { Separator } from "@/components/ui/separator";
import { LecturesList } from "./LecturesList";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Control,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormValues } from "../../pages/RoutineCreator";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

interface ISchedule {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  control: Control<FormValues, any>;
  removeSchedule: UseFieldArrayRemove;
  scheduleIndex: number;
  selectedDays: string[];
}

const Schedule = ({
  register,
  watch,
  control,
  removeSchedule,
  scheduleIndex,
  selectedDays,
}: ISchedule) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <Select
              {...register(`schedules.${scheduleIndex}.day`)}
              onValueChange={(value) => {
                register(`schedules.${scheduleIndex}.day`).onChange({
                  target: { value },
                });
              }}
              value={watch(`schedules.${scheduleIndex}.day`)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem
                    key={d}
                    value={d}
                    disabled={
                      selectedDays.includes(d) &&
                      d !== watch(`schedules.${scheduleIndex}.day`)
                    }
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
          <Label
            htmlFor={`break-${scheduleIndex}`}
            className="flex items-center gap-2"
          >
            <Clock size={16} /> Break Time
          </Label>
          <Input
            id={`break-${scheduleIndex}`}
            {...register(`schedules.${scheduleIndex}.break`)}
            placeholder="e.g., 1:00 PM - 2:00 PM"
          />
        </div>

        <Separator />

        <LecturesList
          scheduleIndex={scheduleIndex}
          control={control}
          register={register}
          watch={watch}
        />
      </CardContent>
    </Card>
  );
};

export default Schedule;
