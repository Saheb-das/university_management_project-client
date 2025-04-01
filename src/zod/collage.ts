// external import
import { z } from "zod";

export const programSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Program name is required"),
});

export const collegeUpdateSchema = z.object({
  logo: z.instanceof(File).optional().or(z.string().optional()),
  studentBody: z
    .number()
    .int()
    .positive("Student body must be a positive number"),
  ranking: z.number().int().positive("Ranking must be a positive number"),
  programs: z.array(programSchema),
  acceptanceRate: z
    .number()
    .min(0)
    .max(100, "Acceptance rate must be between 0 and 100"),
  campusSize: z.number().positive("Campus size must be a positive number"),
  studentFacultyRatio: z
    .string()
    .regex(/^\d+:\d+$/, "Student-faculty ratio must be in format 'X:Y'"),
});

export type CollegeUpdateFormData = z.infer<typeof collegeUpdateSchema>;
export type Program = z.infer<typeof programSchema>;
