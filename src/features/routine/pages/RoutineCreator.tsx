import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RoutineMetaForm from "../components/ui/RoutineMetaForm";
import Schedule from "../components/ui/Schedule";
import Container from "@/components/shared/Container";
import { days, routineSchema } from "@/zod/routine";

type Day = (typeof days)[number];

export type BatchId = "b1" | "b2";

interface Lecture {
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface Schedule {
  day: Day;
  break: string;
  lectures: Lecture[];
}

export interface FormValues {
  batchId: string;
  semesterId: string;
  schedules: Schedule[];
}

export function RoutineCreator() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      batchId: "",
      semesterId: "",
      schedules: [],
    },
  });

  const {
    fields: scheduleFields,
    append: addSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedules",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Routine:", data);
    // Here you would typically send the data to your backend
  };

  const selectedDays = watch("schedules")?.map((s) => s.day) ?? [];

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <RoutineMetaForm control={control} errors={errors} />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <Button
            type="button"
            onClick={() => {
              const remainingDays = days.filter(
                (d) => !selectedDays.includes(d)
              );
              if (remainingDays.length > 0) {
                addSchedule({ day: remainingDays[0], break: "", lectures: [] });
              }
            }}
            disabled={selectedDays.length >= days.length}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Add Day
          </Button>
        </div>

        {errors.schedules && (
          <p className="text-destructive text-sm">
            {(errors.schedules as any)?.message}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scheduleFields.map((_schedule, scheduleIndex) => (
            <Schedule
              key={scheduleIndex}
              control={control}
              register={register}
              watch={watch}
              removeSchedule={removeSchedule}
              scheduleIndex={scheduleIndex}
              selectedDays={selectedDays}
            />
          ))}
        </div>

        {scheduleFields.length > 0 && (
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="px-8">
              Submit Routine
            </Button>
          </div>
        )}
      </form>
    </Container>
  );
}
