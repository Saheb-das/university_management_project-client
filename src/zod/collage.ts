// external import
import { z } from "zod";

export const programSchema = z.string().array().optional();

export const collegeUpdateSchema = z.object({
  approvedBy: z.string().min(1, "Program name is required").optional(),
  ranking: z.string().min(1, "atleast 1 number required").optional(),
  programs: programSchema,
  campusSize: z.string().min(1, "atleast 1 number required").optional(),
});

export type CollegeUpdateFormData = z.infer<typeof collegeUpdateSchema>;
export type Program = z.infer<typeof programSchema>;
