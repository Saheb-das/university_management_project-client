// external import
import { Plus } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import RoutineMetaForm from "../components/ui/RoutineMetaForm";
import Schedule from "../components/ui/Schedule";
import Container from "@/components/shared/Container";

// types import
import { ISchedule, TDay } from "../types/routine";
import { useRoutineCreator } from "../hooks/useRoutineCreator";

export interface IFormValues {
  batchId: string;
  semesterId: string;
  schedules: ISchedule[];
}

export const days: TDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function RoutineCreator() {
  const {
    formData,
    setFormData,
    addSchedule,
    removeSchedule,
    updateSchedule,
    addLecture,
    removeLecture,
    updateLecture,
    selectedDays,
    errors,
    handleSubmit,
    isPending,
  } = useRoutineCreator();

  return (
    <Container>
      <form onSubmit={handleSubmit} className="space-y-8">
        <RoutineMetaForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <Button
            type="button"
            onClick={addSchedule}
            disabled={selectedDays.length >= days.length}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Add Day
          </Button>
        </div>

        {errors.schedules && (
          <p className="text-destructive text-sm">{errors.schedules}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {formData.schedules.map((schedule, scheduleIndex) => (
            <Schedule
              key={scheduleIndex}
              schedule={schedule}
              scheduleIndex={scheduleIndex}
              selectedDays={selectedDays}
              removeSchedule={removeSchedule}
              updateSchedule={updateSchedule}
              addLecture={addLecture}
              removeLecture={removeLecture}
              updateLecture={updateLecture}
              errors={errors}
            />
          ))}
        </div>

        {formData.schedules.length > 0 && (
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="px-8">
              {isPending ? "Submiting..." : "Submit Routine"}
            </Button>
          </div>
        )}
      </form>
    </Container>
  );
}
