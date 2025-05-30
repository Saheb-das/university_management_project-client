// external import
import { BookOpen, Clock, Home } from "lucide-react";
import { useRecoilValue } from "recoil";

// internal import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjectsAtom } from "../../recoil/routineAtom";

// types import
import { ILecture } from "../../types/routine";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LectureInputFieldsProps {
  lecture: ILecture;
  scheduleIndex: number;
  lectureIndex: number;
  updateLecture: (
    scheduleIndex: number,
    lectureIndex: number,
    field: keyof ILecture,
    value: string
  ) => void;
  errors: Record<string, string>;
}

const Lecture = ({
  lecture,
  scheduleIndex,
  lectureIndex,
  updateLecture,
  errors,
}: LectureInputFieldsProps) => {
  const getErrorKey = (field: keyof ILecture) =>
    `schedules.${scheduleIndex}.lectures.${lectureIndex}.${field}`;

  const subjectsBySem = useRecoilValue(subjectsAtom);

  return (
    <>
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <BookOpen size={14} /> Subject
        </Label>

        {/* <Input
          value={lecture.subject}
          onChange={(e) =>
            updateLecture(
              scheduleIndex,
              lectureIndex,
              "subject",
              e.target.value
            )
          }
          placeholder="Subject Name"
        /> */}

        <Select
          value={lecture.subject}
          onValueChange={(value) =>
            updateLecture(scheduleIndex, lectureIndex, "subject", value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjectsBySem &&
              subjectsBySem.length > 0 &&
              subjectsBySem.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {errors[getErrorKey("subject")] && (
          <p className="text-destructive text-sm">
            {errors[getErrorKey("subject")]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Clock size={14} /> Start Time
        </Label>
        <Input
          value={lecture.startTime}
          onChange={(e) =>
            updateLecture(
              scheduleIndex,
              lectureIndex,
              "startTime",
              e.target.value
            )
          }
          placeholder="e.g., 9:00 AM"
          type="time"
        />
        {errors[getErrorKey("startTime")] && (
          <p className="text-destructive text-sm">
            {errors[getErrorKey("startTime")]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Clock size={14} /> End Time
        </Label>
        <Input
          value={lecture.endTime}
          onChange={(e) =>
            updateLecture(
              scheduleIndex,
              lectureIndex,
              "endTime",
              e.target.value
            )
          }
          placeholder="e.g., 10:30 AM"
          type="time"
        />
        {errors[getErrorKey("endTime")] && (
          <p className="text-destructive text-sm">
            {errors[getErrorKey("endTime")]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Home size={14} /> Room
        </Label>
        <Input
          value={lecture.room}
          onChange={(e) =>
            updateLecture(scheduleIndex, lectureIndex, "room", e.target.value)
          }
          placeholder="Room Number/Name"
        />
        {errors[getErrorKey("room")] && (
          <p className="text-destructive text-sm">
            {errors[getErrorKey("room")]}
          </p>
        )}
      </div>
    </>
  );
};

export default Lecture;
