// external import
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

// intenral import
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Home, Plus, Trash2, User } from "lucide-react";
import { FormValues } from "../../pages/RoutineCreator";
import { Lecture } from "./Lecture";

const lectureFields = [
  {
    label: "Subject",
    icon: <BookOpen size={14} />,
    placeholder: "Subject Name",
    name: "subject",
    type: "text",
  },
  {
    label: "Start Time",
    icon: <Clock size={14} />,
    placeholder: "e.g., 9:00 AM",
    name: "startTime",
    type: "time",
  },
  {
    label: "End Time",
    icon: <Clock size={14} />,
    placeholder: "e.g., 10:30 AM",
    name: "endTime",
    type: "time",
  },
  {
    label: "Room",
    icon: <Home size={14} />,
    placeholder: "Room Number/Name",
    name: "room",
    type: "text",
  },
  {
    label: "Teacher (Optional)",
    icon: <User size={14} />,
    placeholder: "Teacher Name",
    name: "asignTeacher",
    type: "text",
  },
];

interface LecturesListProps {
  scheduleIndex: number;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
}

export function LecturesList({
  scheduleIndex,
  control,
  register,
}: LecturesListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `schedules.${scheduleIndex}.lectures`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Lectures</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ subject: "", startTime: "", endTime: "", room: "" })
          }
          className="flex items-center gap-1"
        >
          <Plus size={14} /> Add Lecture
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No lectures added yet. Click "Add Lecture" to begin.
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((lecture, lectureIndex) => (
            <Card key={lecture.id} className="overflow-hidden border-dashed">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-normal">
                    Lecture {lectureIndex + 1}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(lectureIndex)}
                    className="h-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Lecture
                    register={register}
                    lectureIndex={lectureIndex}
                    scheduleIndex={scheduleIndex}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
