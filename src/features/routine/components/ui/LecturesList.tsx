// external import
import { Plus, Trash2 } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Lecture from "./Lecture";

// types import
import { ILecture } from "../../types/routine";

interface LecturesListProps {
  scheduleIndex: number;
  lectures: ILecture[];
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

function LecturesList({
  scheduleIndex,
  lectures,
  addLecture,
  removeLecture,
  updateLecture,
  errors,
}: LecturesListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Lectures</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addLecture(scheduleIndex)}
          className="flex items-center gap-1"
        >
          <Plus size={14} /> Add Lecture
        </Button>
      </div>

      {lectures.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No lectures added yet. Click "Add Lecture" to begin.
        </div>
      ) : (
        <div className="space-y-6">
          {lectures.map((lecture, lectureIndex) => (
            <Card key={lectureIndex} className="overflow-hidden border-dashed">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-normal">
                    Lecture {lectureIndex + 1}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLecture(scheduleIndex, lectureIndex)}
                    className="h-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Lecture
                    lecture={lecture}
                    scheduleIndex={scheduleIndex}
                    lectureIndex={lectureIndex}
                    updateLecture={updateLecture}
                    errors={errors}
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

export default LecturesList;
