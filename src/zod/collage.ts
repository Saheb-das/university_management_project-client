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

// department
export const departmentSchema = z.object({
  type: z.enum(["engineering", "medical", "law", "management"]),
  degree: z
    .array(z.enum(["bachelor", "master", "phd", "diploma"]))
    .min(1, { message: "At least one degree must be selected" }),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;
