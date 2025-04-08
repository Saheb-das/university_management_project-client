import { studentSchema } from "@/zod/user";
import { z } from "zod";

type StudentFieldName = keyof z.infer<typeof studentSchema>;

export const studentFields: {
  name: StudentFieldName;
  type: string;
  placeholder: string;
}[] = [
  { name: "firstName", type: "text", placeholder: "First Name" },
  { name: "lastName", type: "text", placeholder: "Last Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "phone", type: "tel", placeholder: "Phone" },
  { name: "address", type: "text", placeholder: "Address" },
  { name: "adhaarNo", type: "text", placeholder: "Aadhaar Number" },
  { name: "dob", type: "text", placeholder: "Date of Birth (dd-mm-yyyy)" },
  { name: "guardianName", type: "text", placeholder: "Guardian's Name" },
  {
    name: "relWithGuardian",
    type: "text",
    placeholder: "Relation with Guardian",
  },
  {
    name: "gradeAtHigherSec",
    type: "text",
    placeholder: "Grade at Higher Secondary",
  },
  { name: "gradeAtSec", type: "text", placeholder: "Grade at Secondary" },
  { name: "password", type: "password", placeholder: "Password" },
  { name: "admissionYear", type: "text", placeholder: "Admission Year" },
  { name: "batch", type: "text", placeholder: "Batch Name" },
];
