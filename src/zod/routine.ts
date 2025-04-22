// external import
import { z } from "zod";

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const routineSchema = z.object({
  batchId: z.string().min(1, "Please select a batch"),
  semesterId: z.string().min(1, "Please select a semester"),
  schedules: z
    .array(
      z.object({
        day: z.enum(days),
        break: z.string(),
        lectures: z.array(
          z.object({
            subject: z.string().min(1, "Subject is required"),
            startTime: z.string().min(1, "Start time is required"),
            endTime: z.string().min(1, "End time is required"),
            room: z.string().min(1, "Room is required"),
            asignTeacher: z.string().optional(),
          })
        ),
      })
    )
    .refine(
      (schedules) => {
        const days = schedules.map((s) => s.day);
        return new Set(days).size === days.length;
      },
      { message: "Each day can only be added once" }
    ),
});
