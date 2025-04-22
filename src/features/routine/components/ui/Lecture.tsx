import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, Home } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

type LectureInputFieldsProps = {
  register: UseFormRegister<any>;
  scheduleIndex: number;
  lectureIndex: number;
};

export const Lecture = ({
  register,
  scheduleIndex,
  lectureIndex,
}: LectureInputFieldsProps) => {
  const prefix = `schedules.${scheduleIndex}.lectures.${lectureIndex}`;

  return (
    <>
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <BookOpen size={14} /> Subject
        </Label>
        <Input {...register(`${prefix}.subject`)} placeholder="Subject Name" />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Clock size={14} /> Start Time
        </Label>
        <Input
          {...register(`${prefix}.startTime`)}
          placeholder="e.g., 9:00 AM"
          type="time"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Clock size={14} /> End Time
        </Label>
        <Input
          {...register(`${prefix}.endTime`)}
          placeholder="e.g., 10:30 AM"
          type="time"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Home size={14} /> Room
        </Label>
        <Input {...register(`${prefix}.room`)} placeholder="Room Number/Name" />
      </div>
    </>
  );
};
